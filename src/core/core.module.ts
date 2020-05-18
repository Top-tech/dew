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
            host: 'r-8vbtu2cukh3iqdsxpqpd.redis.zhangbei.rds.aliyuncs.com',
            port: 6379,
            password: 'MhxzKhl$#%&'
        })
    ]
})
export class CoreModule {}
