import {
    ForbiddenException,
    HttpException,
    Injectable,
    InternalServerErrorException, Scope,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { CreateUserDto } from '../user/user.dto';
import { DatabaseException } from '../core/exceptions/databaseException';
import { randomBytes } from "crypto";
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { isEmail } from '../util/isEmail';
import { isMobilePhone } from 'class-validator';
import { isIllegalString } from '../util/isIllegalString';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    private redisClientTitanx: Redis

    constructor(
        private usersService: UserService,
        private redisService: RedisService
    ) {
        this.redisClientTitanx = this.redisService.getClient('titanx');
    }

    /**
     * @param username Receive from client, could be email, username or phone number.
     * @param pass: Receive from clint, unencrypted password.
     */
    async validateUser(username: string, pass: string): Promise<Partial<User>> {
        if (isIllegalString(username)) {
            throw new InternalServerErrorException('Illegal username or password');
        }
        let user;
        if (isEmail(username)) {
            user = await this.usersService.findOneByEmail(username);
        } else if (isMobilePhone(username, 'zh-CN')) {
            user = await this.usersService.findOneByPhoneNumber(username);
        } else {
            user = await this.usersService.findOneByUsername(username);
        }
        if (!user) {
            throw new ForbiddenException('Haven\'t register.');
        }
        if (!user.salt) {
            throw new UnauthorizedException('hacking');
        }
        const inputPassword = await this.usersService.encryptPassword(pass, user.salt);
        if (user && user.password === inputPassword) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(register: CreateUserDto) {
        const exist = await this.usersService.isUserExist(register);
        if (typeof exist !== 'number') {
            throw new DatabaseException();
        }
        if (exist) {
            // TODO: When Fastify new version is ready, switch to custom status code.
            // throw new UserExistException();
            throw new InternalServerErrorException(500, 'user exist');
        }

        const salt = await this.usersService.generateSalt();
        // if (!salt) {
        //     throw new InternalServerErrorException();
        // }
        const encryptedPassword = await this.usersService.encryptPassword(register.password, salt);
        const result = await this.usersService.createUser({...register, password: encryptedPassword}, salt);
        if (!result) {
            // TODO: When Fastify new version is ready, switch to custom status code.
            // throw new DatabaseException();
            throw new InternalServerErrorException(500, 'result went wrong');
        }
        return result;
    }

    // TODO: Token interface
    async generateLoginToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            randomBytes(64, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                return resolve(buf.toString('hex'));
            })
        })
    }

    async login(req) {
        const update = await this.usersService.updateUser(req.user._doc.name, {
            ip: req.ip,
            lastLogin: Date.now()
        })
        if (!update) {
            throw new InternalServerErrorException();
        }
        return update;
    }

    async saveTokenIntoRedis(token, user) {
        return await this.redisClientTitanx.set(token, user._doc._id)
    }
}
