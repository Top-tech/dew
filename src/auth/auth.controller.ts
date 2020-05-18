import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
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
    login(@Req() request) {
        console.log(request.user);
        // TODO: generate token
        // TODO: update user status
        return '1';
    }

    @Post('/register')
    register(@Body() register: CreateUserDto) {
        return this.authService.register(register);
    }
}
