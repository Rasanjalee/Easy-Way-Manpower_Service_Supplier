
import {Document } from 'mongoose'


export interface Customer extends Document{
    id:string
    firstName:string
    lastName:string
    location:string
    rate:number
}

export enum CustomerRate{
    TOP_RATE= "FIVE",
    AVG_RATE="FOUR",
    MID_RATE="THREE",
    MIN_RATE= "TWO",
    LOW_RATE= "ONE",
    NOT_RATE = "ZERO"
}