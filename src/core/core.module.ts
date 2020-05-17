import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../mongoose/mongoose-config.service';
import { PassportModule } from '@nestjs/passport';
import * as redisStore from 'cache-manager-ioredis';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        PassportModule.register({
            defaultStrategy: 'local',
            session: false,
        }),
        CacheModule.register({
            store: redisStore,
            host: 'r-8vbtu2cukh3iqdsxpqpd.redis.zhangbei.rds.aliyuncs.com',
            port: 6379,
            password: 'MhxzKhl$#%&'
        })
    ]
})
export class CoreModule {}
