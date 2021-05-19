import { HttpException, Inject, Injectable, Logger, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { CustomerSearchDto } from './customerSearch.dto';
import { InjectModel } from '@nestjs/mongoose'
import {Model} from 'mongoose'
import { CustomerRepositry } from './customer.repository';
import { Customer } from 'src/schemas/customer.schema';
import { CustomerCreateDto } from './customerCreate.dto';
import { FindConditions } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';

@Injectable()
export class CustomersService {


    constructor(private customerRepositry:CustomerRepositry,@Inject('FEEDBACK_CLIENT') private readonly client:ClientProxy){

    }

    async getAllCustomers():Promise<Customer[]>{
        const customers = await this.customerRepositry.findAll();
        if(!customers || !customers[0]){
            throw new HttpException("No Records Found",404)
        }
        return customers;
    }
    // async searchCustomers(customerSearchDto:CustomerSearchDto){

        // const customers = await this.customerRepositry.create(customerSearchDto);
        // if(!customers || !customers[0]){
        //     throw new HttpException("No Records Found",404)
        // }
        // return customers;
          
        // }

    async createCustomers(customerCreateDto:CustomerCreateDto){
        return await this.customerRepositry.create(customerCreateDto)

    }
    async getCustomerById(id:string):Promise<Customer>{
        const customer= await this.customerRepositry.findById(id);
        try{
            const rate = await this.client.send({cmd:'getUserRate'},{id})
            .pipe(
                timeout(5000),
                catchError(err=>{
                    if (err instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException());
                      }
                      return throwError(err); 
                })

            ).toPromise();
            if(rate){
                customer.rate = rate;
            }
        }
        catch(e){
            Logger.log(e);
        }
        return customer;
       
    }
    findOne(query:FindConditions<Customer>):Promise<Customer>{
        return this.customerRepositry.findOne(query)
    }

}


