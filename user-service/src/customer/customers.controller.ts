import { Body, Controller, Get, HttpException, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import {CustomerCreateDto} from './customerCreate.dto'
import { Customer } from 'src/schemas/customer.schema';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';
import { WorkersService } from 'src/worker/workers.service';
import {Worker} from '../schemas/worker.schema'

@Controller('customer')
export class CustomersController {


    constructor(private customersService:CustomersService,private workerService:WorkersService){

    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllCustomers():Promise<Customer[]>{

        // if(Object.keys(param).length){
        //     console.log(param)
        //     console.log("filter")
        //     return this.customersService.searchCustomers(param)
        // } else{
        //     console.log("without flter")

            return await this.customersService.getAllCustomers();
        // }
    } 

    @Post()
    async createCutomer(@Body() customerCreateDto:CustomerCreateDto){
        const customer= await  this.customersService.createCustomers(customerCreateDto); 
        if(!customer){
            return new HttpException("Not created",204);
        }
        return customer;
    
    }
    @UseGuards(AuthGuard)
    @Get('/:id')
    async getCustomerDetailById(@Param('id') id:string){
        return await this.customersService.getCustomerById(id);
    }

    @MessagePattern({cmd:'get deatails by id'})
    async getCustomerById(data:any):Promise<Customer>{
        console.log("come here")
        return  await this.customersService.getCustomerById(data.searchId);
    }

    @MessagePattern({role:'customer',cmd:'get'})
    async getUser(data:any):Promise<Customer>{
        return await this.customersService.findOne({username:data.username})

    }

    @UseGuards(AuthGuard)
    @Post('/nearest/worker')
    async getWorkerByLocation(@Body() req):Promise<Worker[]>{
        const worker =  await this.workerService.findWorker(req.location);
        if(!worker || !worker[0]){
            throw new NotFoundException("not found")
            
        }
        return worker;
    }


}

