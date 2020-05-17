import { HttpException } from '@nestjs/common';

export class DatabaseException extends HttpException {
    constructor() {
        super('Something went wrong in Database.', 701);
    }
}
