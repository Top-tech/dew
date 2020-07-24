import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URI}`,
            useNewUrlParser: true,
            useUnifiedTopology: true
            // connectionFactory: connection => {
            //     console.log(connection);
            //     return connection
            // }
        };
    }
}
