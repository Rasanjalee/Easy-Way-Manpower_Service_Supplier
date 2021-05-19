import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer, CustomerDocument } from "src/schemas/customer.schema";
import { CustomerCreateDto } from "./customerCreate.dto";
const Bcrypt =require('bcrypt')
@Injectable()
export class CustomerRepositry{
    
    constructor(@InjectModel(Customer.name) private customerModel:Model<CustomerDocument>){

    }

    async findOne(query): Promise<Customer> {
        return  await  this.customerModel.findOne(query);
         
    }

    async getOneOrFail(username: string) {
        
        const customer = await this.customerModel.findOne({username:username})
        if(customer){
            throw  new NotFoundException("not Found")
        }
            return customer;
      }

    async create(createCustomerDto:CustomerCreateDto):Promise<Customer>{
        let newCustomer = new  this.customerModel(createCustomerDto);
        newCustomer.password = Bcrypt.hashSync(newCustomer.password,10);
        newCustomer.role= 'customer';
        
        return await newCustomer.save();
        
    }
    async findAll():Promise<Customer[]>{
        let customers= await this.customerModel.find();
        if(!customers || !customers[0]){
            throw new NotFoundException("No record found");
        }
        return customers

    }
    async findById(id:string):Promise<Customer>{
        let customer =  await this.customerModel.findById({_id:id});
        console.log(customer)
        return customer;
        
    }

}