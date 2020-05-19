import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UserModule
    ],
    providers: [
        AuthService,
        LocalStrategy
    ],
    exports: [
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule {
}
