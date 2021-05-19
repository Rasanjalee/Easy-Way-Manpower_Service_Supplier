import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { WorkerRepository } from "src/worker/worker.repository";
import { AgentRepository } from "../agent/aget.repository";
import { CustomerRepositry } from "../customer/customer.repository";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private usersRepository: CustomerRepositry,private agentRepository:AgentRepository,private workerRepository:WorkerRepository) {}

  async validate(value: string) {
    try {
       await this.usersRepository.getOneOrFail(value);
       await this.agentRepository.getOneOrFail(value);
       await this.workerRepository.getOneOrFail(value);
    } catch (e) {
      return false;
    }
    return true;

  }

  defaultMessage(args: ValidationArguments) {
       
     return `${args.value} username already exist `;
  }
}