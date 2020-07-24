import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../mongoose/mongoose-config.service';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'nestjs-redis'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        PassportModule.register({
            defaultStrategy: 'local',
            session: false,
        }),
        RedisModule.register({
            name: process.env.REDIS_USER,
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
        })
    ]
})
export class CoreModule {}
