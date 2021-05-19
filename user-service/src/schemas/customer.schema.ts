import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { IsEmail, IsNotEmpty, Min } from "class-validator";
import {Document} from 'mongoose'

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
    @Prop()
    id:string
    @Prop()
    firstName:string
    @Prop()
    lastName:string
    @Prop()
    location:string
    @Prop()
    role:string
    @Prop()
    username:string
    @Prop()
    password:string
    @Prop()
    image:string
    @Prop()
    rate:number
}
export const CustomerSchema =  SchemaFactory.createForClass(Customer)