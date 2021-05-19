const {RESTDataSource} = require('apollo-datasource-rest')

class UserService extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'http://localhost:3000'
    }
    async createUsers(args){
        return await this.post('/users',args)
    }
    async login(args){
        const user =  await this.post('/auth',args)
        return user;
    }
    async getProfile(args){
        console.log("ee")
        const user = await this.get('/profile',args)
        console.log(user)
        // return user.userId
    }
}
module.exports = UserService;