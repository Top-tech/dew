import { HttpException } from '@nestjs/common';

export class UserExistException extends HttpException {
    constructor() {
        super('UserExist', 601);
    }
}
