import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail } from 'class-validator'
import * as mongoose from 'mongoose'

export type AgentDocument =  Agent & mongoose.Document

@Schema()
export class Agent{
    @Prop()
    id:string
    @Prop({required:true})
    name:string
    @Prop({required:true})
    regNo:string
    @Prop({required:true})
    location:string
    @Prop()
    image:string
    @Prop()
    rate:number
    @Prop()
    role:string
    @Prop()
    username:string
    @Prop()
    password:string
}

export const  AgentSchema = SchemaFactory.createForClass(Agent);