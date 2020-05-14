import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<User>
    ) {
    }

    async findOneByUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ name: username }, (err, user) => {
                if (err) {
                    return reject(err)
                }
                resolve(user);
            })
        });
    }
}
