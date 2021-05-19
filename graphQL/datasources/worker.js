const {RESTDataSource}  = require('apollo-datasource-rest')




class WorkerService extends RESTDataSource{


    constructor(){
        super();
        this.baseURL = 'http://localhost:3001'
    }
    

    async getAllWorkers(){
        return await this.get('/workers');

    }
    async getWorkerById(id){
        return await this.get(`/workers/${id}`);    
    }
    async addWorkers(args){
        return await this.post(`/workers`,args);
    }
    async deleteWorkerById(id){
        return await this.delete(`/workers/${id}`);
    }
}

module.exports = WorkerService