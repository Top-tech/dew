import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from './guards/token.guard';

@Module({
    imports: [
        CoreModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: TokenGuard,
        }
    ],
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
