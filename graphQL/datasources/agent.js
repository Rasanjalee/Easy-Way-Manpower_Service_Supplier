const {RESTDataSource} = require('apollo-datasource-rest')

class AgentService extends RESTDataSource{

    constructor(){
        super();
        this.baseURL = 'http://localhost:3001'
    }
    async getAllAgents(){
        return await this.get('/agent')
    }
    async getAgentsById(id){

        return await this.get(`/agent/${id}`)
    }
    async addAgent(args){
        return await this.post(`/agent`,args)
    }
    async updateAgentWorkers(args){
        return await this.put(`/agent/`,args)
    }
}
module.exports = AgentService