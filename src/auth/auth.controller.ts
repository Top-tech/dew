import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor() {
    }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    login(@Body() body): string {
        console.log(body);
        return '1';
    }
}
