import { Agent } from "src/schemas/agent.schema";

export interface WorkerUpdateDto{
    id:string
    location:string
    jobTitle:String
    rate:String
    agent:Agent
    password:string
    username:string
    
}