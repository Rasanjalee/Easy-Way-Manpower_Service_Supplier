import { IsEmail, IsNotEmpty, registerDecorator, ValidationOptions } from "class-validator"
import { UserExistsRule } from "src/validators/userExist.validator"

export class CreateAgentDto{
    
    name:string
    regNo:string
    location:string
    rate:number
    role:string
    image:string
    @UserExists()
    @IsEmail()
    username:string
    @IsNotEmpty()
    password:string
    
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