const { RESTDataSource } = require("apollo-datasource-rest");

class FeedbackService extends RESTDataSource{
    constructor(){
        super();
        this.baseURL='http://localhost:3002'
    }
    async getAllFeedbacks(){
        return await this.get('/feedbacks')
    }

    async createFeedback(args){
        return await this.post('/feedbacks',args);
    }
    async getUserRate(id){
        return await this.get(`/feedbacks/${id}/${role}`);
    }
    async getSent(id,role){
        return await this.get(`/feedbacks/sent/${id}/${role}`);
    }
    async getReceived(id,role){
        return await this.get(`/feedbacks/received/${id}/${role}`);
    }
}
module.exports = FeedbackService;