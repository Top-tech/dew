import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: 'mongodb://titanx:MhxzKhl$#%&@dds-8vbc17945a6858d41110-pub.mongodb.zhangbei.rds.aliyuncs.com:3717/titanx',
            useNewUrlParser: true,
            useUnifiedTopology: true
            // connectionFactory: connection => {
            //     console.log(connection);
            //     return connection
            // }
        };
    }
}
