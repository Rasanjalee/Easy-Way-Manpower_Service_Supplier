import { Body, Controller, Get, HttpException, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';
import { Agent } from 'src/schemas/agent.schema';
import { AgentService } from './agent.service';


@Controller('agent')
export class AgentController {
    constructor(private agentService:AgentService){

    }

    @Get()
    async getAllgents():Promise<Agent[]>{
        return await this.agentService.getAllAgents();
    }

    @Post()
    async createAgent(@Body() createAgentDto):Promise<Agent>{
        const agent = await this.agentService.createAgent(createAgentDto)
        if(!agent){

            throw  new HttpException("not created",400);
        }
        return agent;
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findAgentsById(@Param('id') id:string){
        console.log("aFzrge")

        return await this.agentService.findAgentsById(id);
    }

    @UseGuards(AuthGuard)
    @Put()
    updateAgentWorker(@Body() request){
        return this.agentService.updateAgentWorker(request.id,request.workerId)
    }

    @MessagePattern({role:'agent',cmd:'get'})
    async getUser(data:any):Promise<Agent>{
        return await this.agentService.findOne({username:data.username})

    }
}
