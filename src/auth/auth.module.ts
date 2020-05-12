import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UserModule,
        // PassportModule.register({
        //     defaultStrategy: 'local'
        // })
    ],
    providers: [
        // AuthService,
        // LocalStrategy
    ],
    // exports: [
    //     AuthService
    // ],
    controllers: [AuthController]
})
export class AuthModule {
}
