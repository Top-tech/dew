import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose/mongoose-config.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

    // configure(consumer: MiddlewareConsumer): any {
    //     consumer.apply(AuthMiddleware)
    //         .exclude({
    //             path: 'auth/login',
    //             method: RequestMethod.POST
    //         })
    //         .forRoutes(AuthController)
    // }

}
