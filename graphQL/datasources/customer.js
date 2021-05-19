const {RESTDataSource} =require('apollo-datasource-rest');


class CustomerService extends RESTDataSource{

    constructor(){
        super();
        this.baseURL ='http://localhost:3001'
        
    }
    
    async getCustomers(){
        return await this.get('/customer')
    }

   async getCustomerById(id){
        return await this.get(`/customer/${id}`)
    }
    async addCustomer(args){
        const customer = await this.post(`/customer`,args)
        return customer;
    }

}

module.exports = CustomerService