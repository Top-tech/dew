import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../mongoose/mongoose-config.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        PassportModule.register({
            defaultStrategy: 'local',
            session: false,
        }),
    ]
})
export class CoreModule {
}
