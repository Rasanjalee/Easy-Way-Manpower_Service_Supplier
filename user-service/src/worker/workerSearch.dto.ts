import { Agent } from "src/schemas/agent.schema";

export interface WorkerSearchDto{
    name:string
    lastName:string
    jobTitle:string
    rate:number
    location:string
    agent:Agent
    username:string
    password:string
}