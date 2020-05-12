import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bindNodeCallback, Observable } from 'rxjs';
import { User } from './user.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<User>
    ) {
    }

    findOne(username: string) {
        // this.userModel.find((err, res) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log('+++++++++++++++++', res);
        // })
        console.log(username);
        const user$ = bindNodeCallback(this.userModel.find.bind(this.userModel));
        return user$({ name: username }).pipe(
            tap(console.log)
        )
    }
}
