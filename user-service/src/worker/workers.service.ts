import { HttpException, Inject, Injectable, Logger, Post, RequestTimeoutException } from '@nestjs/common';
import { WorkerUpdateDto } from './workerUpdate.dto';
import { WorkerRepository } from './worker.repository';
import {Worker} from '../schemas/worker.schema'
import { WorkerCreateDto } from './workerCrate.dto';
import { FindConditions } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import { worker } from 'node:cluster';
@Injectable()
export class WorkersService {
   


    constructor(private workerRepository:WorkerRepository,@Inject('FEEDBACK_CLIENT') private readonly client:ClientProxy){
        
    }

    async getAllWorkers():Promise<Worker[]>{
       return this.workerRepository.findAll();
    }

    async createWorker(workerCreateDto:WorkerCreateDto):Promise<Worker>{
        return this.workerRepository.create(workerCreateDto);


    }

    // async searchWorker(workerSearchDto: WorkerSearchDto):Promise<Worker[]>{
        // const workers = await this.WorkerModel.find(workerSearchDto).exec();
        // if(!workers || !workers[0]){
        //     throw new  HttpException('No Record Found',404);

        // }
        // return workers;
    // }
    async getWorkerById(id:string):Promise<Worker>{

        console.log("hit")
        console.log(id)
        
        try{
        const worker = await this.workerRepository.findById(id);

            const rate = await this.client.send({cmd:'getUserRate'},{id})
            .pipe(timeout(5000),
            catchError(err=>{
                if (err instanceof TimeoutError) {
                    return throwError(new RequestTimeoutException());
                  }
                  return throwError(err);

            })).toPromise();
            if(rate){
                console.log(rate)
                worker.rate = rate;
            }

        return worker

        }
        catch(e){
            Logger.log(e)
        }
        
    }
    async updateWorker(workerUpdateDto : WorkerUpdateDto){
        // const worker = await this.WorkerModel.findOneAndUpdate({workerUpdateDto})
        // return worker;
    }
    async deleteWorker(id){
        // const worker = await this.WorkerModel.findByIdAndDelete(id);

        // if(!worker){
        //     throw new HttpException('No Record Found',404)
        // }
        // return worker
    }
    findOne(query:FindConditions<Worker>):Promise<Worker>{
        return this.workerRepository.findOne(query)
    }
    async findWorker(location: String):Promise<Worker[]> {
        const workers= await this.workerRepository.findWorker(location);
        
        return workers
    }
    async findWorkers(id:string){
        const workers = await this.workerRepository.findWorkerByAgent(id)
       return workers
    }
    
}
