import { IsEmail, IsNotEmpty, registerDecorator, ValidationOptions } from "class-validator"
import { UserExistsRule } from "../validators/userExist.validator"


export class CustomerCreateDto{



    @IsNotEmpty()
    firstName:string
    lastName:string
    location:string
    rate:string
    role:string
    @UserExists()
    @IsEmail()
    username:string
    @IsNotEmpty()
    password:string
    image:string
}



function UserExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
          name: 'UserExists',
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          validator: UserExistsRule,
        });
      };}

