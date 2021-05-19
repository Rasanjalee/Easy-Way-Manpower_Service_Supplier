import { IsEmail, IsIn, IsNotEmpty, registerDecorator, ValidationOptions } from "class-validator";
import { Agent } from "src/schemas/agent.schema";
import { UserExistsRule } from "src/validators/userExist.validator";
import {  WorkerStatus } from "../enums/workerStatus";

export class WorkerCreateDto{

    firstName:string
    lastName:string
    jobTitle:string
    location:string
    status:WorkerStatus
    charge:number
    agent:Agent
    role:string
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