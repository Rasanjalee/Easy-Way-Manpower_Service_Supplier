import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose"
import {Document} from 'mongoose'
import * as mongoose from 'mongoose'
import { Agent } from "./agent.schema"


export type WorkerDocument  = Worker & Document

@Schema()
export class  Worker{
    @Prop()
    _id:string
    @Prop({required:true})
    firstName:string
    @Prop()
    location:string
    @Prop()
    lastName:string
    @Prop()
    jobTitle:string
    @Prop()
    status:string
    @Prop()
    image:string
    @Prop()
    charge:Number
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Agent'})
    agent:Agent
    @Prop()
    role:string
    @Prop()
    username:string
    @Prop()
    password:string
    @Prop()
    rate:number
}

export const WorkerSchema = SchemaFactory.createForClass(Worker)