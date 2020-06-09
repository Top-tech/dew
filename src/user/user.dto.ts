import {
    IsDate,
    IsEmail, IsIP,
    IsNotEmpty,
    IsPhoneNumber,
    Matches,
    MaxLength,
    MinLength, Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsSameAs } from '../core/validatior/is-same-as.validators';


export class CreateUserDto {
    @IsNotEmpty({
        message: 'Name shouldn\'t be empty'
    })
    @MinLength(6, {
        message: 'At least has 5 characters.'
    })
    @Matches(/^[a-zA-Z0-9\-_]\w{4,20}$/, {
        message: 'Name is illegal.',
    })
    readonly name: string;

    @IsNotEmpty({
        message: 'Email shouldn\'t be empty'
    })
    @IsEmail({}, {
        message: 'Email is illegal.',
    })
    @Transform(value => value.toLowerCase(), { toClassOnly: true })
    readonly email: string;

    @IsPhoneNumber('CN')
    readonly phone?: string;

    @IsNotEmpty({
        message: 'Password shouldn\'t be empty'
    })
    @MinLength(8, {
        message: 'Password must be longer than or equal to 8 characters'
    })
    @MaxLength(64, {
        message: 'Are u able to remember this long?'
    })
    readonly password: string;

    @IsNotEmpty({
        message: 'Password Confirmation shouldn\'t be empty'
    })
    @IsSameAs('password', {
        message: 'Password confirmation is not as same as password.'
    })
    readonly passwordConfirmation: string;
}

export class UpdateUserDto {
    // readonly email?: string;
    // readonly phone?: string;
    @IsIP(4)
    readonly ip;

    readonly lastLogin?;
}
