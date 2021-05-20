import {IsEmail, IsObject, IsString, Length, validate, ValidationError} from 'class-validator';


export class UserValidator {

    @IsString()
    @Length(3,8)
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    @Length(5,10)
    phone?: string;

    @IsObject()
    address?: string;

    @IsObject()
    company?: string;
   
}

export default UserValidator;