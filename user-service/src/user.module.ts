import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentController } from './agent/agent.controller';
import { AgentRepository } from './agent/aget.repository';
import { CustomerRepositry } from './customer/customer.repository';
import { CustomersController } from './customer/customers.controller';
import { CustomersService } from './customer/customers.service';
import { CustomerSchema } from './schemas/customer.schema';
import { WorkerSchema } from './schemas/worker.schema';
import { WorkerRepository } from './worker/worker.repository';
import { WorkersController } from './worker/Workers.controller';
import { WorkersService } from './worker/workers.service';
import { ClientsModule } from '@nestjs/microservices';
import { AgentService } from './agent/agent.service';
import { AgentSchema } from './schemas/agent.schema';
import { UserExistsRule } from './validators/userExist.validator';


@Module({
    imports: [
        MongooseModule.forFeature([{
        name:'Worker',schema:WorkerSchema
    }]),MongooseModule.forFeature([{
        name:'Customer',schema:CustomerSchema
    }]),MongooseModule.forFeature([{
        name:'Agent',schema:AgentSchema
    }]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    }]),
    ClientsModule.register([{
      name:'FEEDBACK_CLIENT',
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:4020
      }
    }])
] ,
      controllers:[WorkersController,CustomersController,AgentController],
      providers:[WorkersService,WorkerRepository,CustomersService,CustomerRepositry,AgentRepository,AgentService,UserExistsRule]
  })
export class UserModule{

}