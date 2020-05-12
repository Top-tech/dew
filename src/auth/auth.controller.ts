import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
// import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService
    ) {
        console.log('auth');
    }

    @Post('/login')
    // @UseGuards(LocalAuthGuard)
    login(@Body() body): Observable<any> {
        console.log(body);
        return this.userService.findOne(body.username);
        // this.userService.findOne(body.username).subscribe(
        //     console.log,
        //     console.log
        // );
    }
}
