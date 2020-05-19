import { Body, Controller, Post, UseGuards, Req, InternalServerErrorException } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {
    }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() request) {
        const token = await this.authService.generateLoginToken();
        const redisResponse = await this.authService.saveTokenIntoRedis(token, request.user);
        if (!redisResponse) {
            throw new InternalServerErrorException();
        }
        const result = await this.authService.login(request);
        if (!result) {
            throw new InternalServerErrorException();
        }
        return token;
    }

    @Post('/register')
    register(@Body() register: CreateUserDto) {
        return this.authService.register(register);
    }
}
