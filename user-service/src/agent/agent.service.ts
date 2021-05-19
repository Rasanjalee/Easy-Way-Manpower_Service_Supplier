import { HttpException, Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { workers } from 'node:cluster';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Agent } from 'src/schemas/agent.schema';
import { FindConditions } from 'typeorm';

import { AgentRepository } from './aget.repository';
import { CreateAgentDto } from './createAgent.dto';
@Injectable()
export class AgentService {



    constructor(private agentRepository:AgentRepository,@Inject('FEEDBACK_CLIENT') private readonly client:ClientProxy){
        
    }

    async getAllAgents():Promise<Agent[]>{
        return this.agentRepository.findAll();
    }
    async createAgent(createAgentDto:CreateAgentDto):Promise<Agent>{
        return this.agentRepository.create(createAgentDto);
    }
    async findAgentsById(id){
        const agent  = await this.agentRepository.findById(id);
        if(!agent){
            throw new HttpException('no Record Found',404)
        }

        try{
            const rate = await this.client.send({cmd:'getUserRate'},{id})
            .pipe(
                timeout(5000),
                catchError(err=>{
                    if (err instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException());
                      }
                      return throwError(err); 
                })

            ).toPromise();
            if(rate){
                agent.rate = rate;
            }
        }
        catch(e){
            Logger.log(e);
        }

        return agent
    }
    async updateAgentWorker(id:string,workerId:string){

        // const agent  = await this.findAgentsById(id);

        // const updatedWorkers = (await this.findAgentsById(id)).workers
        // updatedWorkers.push(workerId)
        // console.log(updatedWorkers)



        // return  await this.AgentModel.findOneAndUpdate({_id:id},{workers:updatedWorkers})  .exec()


    }
    findOne(query:FindConditions<Agent>):Promise<Agent>{
        return this.agentRepository.findOne(query)
    }
}
