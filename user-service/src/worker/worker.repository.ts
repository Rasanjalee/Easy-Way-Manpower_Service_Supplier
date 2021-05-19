import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { worker } from "node:cluster";
import { WorkerStatus } from "src/enums/workerStatus";
import { WorkerDocument,Worker } from "src/schemas/worker.schema";
import { WorkerCreateDto } from "./workerCrate.dto";
const Bcrypt = require('bcrypt');


@Injectable()
export class WorkerRepository{
    
    
    constructor(@InjectModel(Worker.name) private workerModel:Model<WorkerDocument>){

    }

    async findById(id: string):Promise<Worker> {
        return await this.workerModel.findById({_id:id});

    }


    async create(workerCreateDto:WorkerCreateDto):Promise<Worker>{
        let newWorker = new this.workerModel(workerCreateDto);
        newWorker.password = Bcrypt.hashSync(newWorker.password,10)
        newWorker.role = 'worker'
        newWorker.status = WorkerStatus.ACTIVE;
        return await newWorker.save();
    }

    async findAll():Promise<Worker[]>{
        return await this.workerModel.find();

    }
    async findOne(query): Promise<Worker> {
        return  await  this.workerModel.findOne(query);
         
    }
    async getOneOrFail(username: string) {
        const worker = await this.workerModel.findOne({username:username});
        if(worker){
            throw new BadRequestException("user Already exist")
        }
        return worker;

    }


    async findWorker(location:String):Promise<Worker[]>{
        const workers = await this.findAll();
        const nearestWorkers = [];
        workers.filter((worker)=>{
            console.log(this.distance(worker.location.split(',')[0],worker.location.split(',')[1],location.split(',')[0],location.split(',')[1],"K"))
            if(this.distance(worker.location.split(',')[0],worker.location.split(',')[1],location.split(',')[0],location.split(',')[1],"K")<=20){
                nearestWorkers.push(worker)
            }
        })
        return nearestWorkers
    }



    async findWorkerByAgent(id:string){
        const workers = await this.findAll();
        return workers.filter((worker)=>worker.agent.valueOf()==id
        )
    }
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else{
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist
        }
        
    }
}