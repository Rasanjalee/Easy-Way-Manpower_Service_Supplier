import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Agent, AgentDocument } from "src/schemas/agent.schema";
import { CreateAgentDto } from "./createAgent.dto";
const Bcrypt = require('bcrypt')

@Injectable()
export class AgentRepository{
    constructor(@InjectModel(Agent.name) private  agentModel:Model<AgentDocument> ){}

    async create(createAgentDto:CreateAgentDto):Promise<Agent>{
        let newAgent = new  this.agentModel(createAgentDto);
        newAgent.role = 'agent'
        newAgent.password = Bcrypt.hashSync(newAgent.password,10)
        return await newAgent.save()
    }
    async findAll():Promise<Agent[]>{
        return await this.agentModel.find();

    }
    async findOne(query): Promise<Agent> {
        const x=  await  this.agentModel.findOne(query);
        return x;
    }


    async getOneOrFail(username: string) {
        console.log("user")
        
        const agent = await this.agentModel.findOne({username:username})
        if(agent){
            throw  new NotFoundException("not Found")
        }
            return agent;
      }

      async findById(id:string){
          console.log(id)
          return await this.agentModel.findById({_id:id})
      }

}