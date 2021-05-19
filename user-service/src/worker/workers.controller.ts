import { Body, Controller, Get, Post, Query ,Param, Put, Delete, HttpCode, NotFoundException, UseGuards} from '@nestjs/common';
import { WorkerCreateDto } from './workerCrate.dto';
import { WorkersService } from './workers.service';
import { WorkerSearchDto } from './workerSearch.dto';
import { WorkerUpdateDto } from './workerUpdate.dto';
import {Worker} from '../schemas/worker.schema'
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('worker')
export class WorkersController {

    constructor(private workersService:WorkersService){

    }

    @UseGuards(AuthGuard)
   @Get()
    async getAllWorkers(@Query() param :WorkerSearchDto):Promise<Worker[]>{

        return this.workersService.getAllWorkers();
        // if(Object.keys(param).length){
        //     console.log(param)
        //     console.log("filter")
        //     return this.workersService.searchWorker(param)
        // } else{
        //     console.log("without flter")

        //     return this.workersService.getAllWorkers();
        // }
    }

    @UseGuards(AuthGuard)
    @Post()
    createWorker(@Body() workerCreateDto:WorkerCreateDto):Promise<Worker>{

        return  this.workersService.createWorker(workerCreateDto)
    }

    @MessagePattern({cmd:'get worker deatails by id'})
    getWorkerById(data:any){
        console.log(data.searchId)
        return this.workersService.getWorkerById(data.searchId);

    }
    @UseGuards(AuthGuard)  
    @Get('/:id')
    getWorkerDeatilById(@Param() id:string){
        return this.workersService.getWorkerById(id);

    }

    @UseGuards(AuthGuard)
    @Put('/:id/location')
    UpdateWorker(@Param('id') id:string, @Body() workerUpdateDto:WorkerUpdateDto){

        // workerUpdateDto.id= id;
        // return this.workersService.updateWorker(workerUpdateDto)

    }
    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteWorker(@Param('id') id:string){
        // return this.workersService.deleteWorker(id)
    }

    @MessagePattern({role:'worker',cmd:'get'})
    async getUser(data:any):Promise<Worker>{
        return await this.workersService.findOne({username:data.username})

    }
    

    @UseGuards(AuthGuard)
    @Get('agent/:id')
    async getWorkerForGivenAgent(@Param('id') id:string){
        return await this.workersService.findWorkers(id)
    }

 

}
