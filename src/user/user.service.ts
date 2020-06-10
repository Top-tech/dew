import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import * as crypto  from 'crypto';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserExistException } from '../core/exceptions/user-exist.exception';
import { BinaryLike } from "crypto";

interface KeyValue {
    key: string;
    value: string;
}

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<User>
    ) {
    }

    async findOneByUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ name: username }, (err, user) => {
                if (err) {
                    return reject(err)
                }
                return resolve(user);
            })
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ email: email }, (err, user) => {
                if (err) {
                    return reject(err)
                }
                return resolve(user);
            })
        });
    }

    /**
     * Search user by phone number.
     *
     * @param phone <string>
     */
    async findOneByPhoneNumber(phone: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ phone: phone }, (err, user) => {
                if (err) {
                    return reject(err)
                }
                return resolve(user);
            })
        });
    }

    async findOneByCondition(condition: KeyValue) {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ [condition.key]: condition.value }, (err, user) => {
                if (err) {
                    return reject(err)
                }
                return resolve(user);
            })
        });
    }

    async generateSalt(): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                return resolve(buf.toString('hex'));
            });
        })
    }

    async encryptPassword(password: string, salt: BinaryLike): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 10000, 64, 'sha256', (err, derivedKey) => {
                if (err) {
                    return reject(err);
                }
                return resolve(derivedKey.toString('hex'));
            })
        });
    }

    async createUser(createUserDto: CreateUserDto, salt) {
        return this.userModel.create({
            ...createUserDto,
            salt,
            created: Date.now()
        });
    }

    async updateUser(username: string, createUserDto: UpdateUserDto) {
        return new Promise((resolve, reject) => {
            return this.userModel.updateOne({ name: username }, {
                ...createUserDto,
                update: Date.now()
            }, (err, raw) => {
                if (err) {
                    return reject(err);
                }
                return resolve(raw);
            });
        })
    }

    async abandonUser(username: string) {
        return this.userModel.update({ name: username }, {
            deprecated: true
        });
    }

    isUserExist(register: CreateUserDto) {
        const { name, email } = register;
        return this.userModel.collection.countDocuments(
            {
                $or: [
                    { name },
                    { email }
                ]
            },
            {
                limit: 1
            }
        );
    }
}
