const {ApolloServer,gql} = require('apollo-server');
const CustomerService = require('./datasources/customer');
const WorkerService = require('./datasources/worker');
const AgentService = require('./datasources/agent')
const BookingService = require('./datasources/booking')
const UserService = require('./datasources/user');
const FeedbackService = require('./datasources/fedback');


const typeDefs = gql`
type Query{
    customers:[Customer]
    findCustomersById(_id:ID):Customer
    findWorkerById(id:ID):Worker
    workers:[Worker]
    feedbacks:[Feedback]
    bookings:[Booking]
    agents:[Agent]
    findAgentsById(id:ID):Agent
    sentFeedbacks(id:String,role:String):[FeedbackDeatil]
    receivedFeedbacks(id:String):[FeedbackDeatil]
    rate(id:String):Int

}

type Mutation {
    addCustomer(firstName:String,lastName:String,location:String,rate:Int,username:String,password:String,image:String):Customer
    addWorkers(firstName:String,lastName:String,jobTitle:String,rate:Int,location:String,agent:String,status:String,image:String,charge:Int):Worker
    addAgent(name:String,regNo:String,location:String,username:String,password:String,image:String):Agent
    updateAgentWorkers(id:String,workerId:String):Agent
    deleteWorker(id:String):Worker
    bookAWorker(customer:String,worker:String):Booking
    login(username:String,password:String):LoginDeatil
    profile(username:String,password:String):ValidUser
    createFeedback(feedbackBy:String,feedbackTo:String,feedbackRate:Int,feedbackMessage:String):Feedback
	

}
type LoginDeatil{
    userRole:String
    userId:String
    accessToken:String
    location:String
}
type ValidUser{
    userId:String
}
type HttpException{
    status:Int,
    message:String
}
type Customer{
    _id:ID!,
    firstName:String,
    lastName:String,
    location:String,
    rate:Int,
    image:String,
    username:String,
    password:String,
    role:String

}
type Worker{
    _id:ID!
    firstName:String,
    lastName:String,
    jobTitle:String,
    rate:Int,
    location:String,
    agent:Agent,
    status:String,
    image:String,
    charge:Int,
}   
type Feedback{
    _id:ID!
    feedbackBy:String,
    feedbackTo:String,
    feedbackRate:Int,
    feedbackMessage:String
}
type FeedbackDeatil{
    feedbackBy:String
    feedbackTo:String
    feedbackImage:String
    feedbackMessage:String
    feedbackRate:String
}
type Booking{
    _id:ID!
    bookingDate:String,
    customer:Customer,
    worker:Worker

}
type Agent {
    _id:ID!
    name:String
    regNo:String
    location:String
    rate:Int
    role:String
    username:String
    password:String
    image:String
}
type User{
    _id:ID!
    username:String
    userId:String
    role:String
    password:String
}

`


const dataSources = () =>({
    customerService : new CustomerService(),
    workerService : new WorkerService(),
    agentService: new AgentService(),
    bookingService:new BookingService(),
    userService:new UserService(),
    feedbackService:new FeedbackService()
})

const resolvers = {
    Mutation:{

        addCustomer(parent,args,{dataSources}){
            console.log(args)
            return  dataSources.customerService.addCustomer(args);
        },
        addWorkers(parent,args,{dataSources}){
            return dataSources.workerService.addWorkers(args)
        },
        addAgent(paernt,args,{dataSources}){
            return dataSources.agentService.addAgent(args)
        },
        updateAgentWorkers(parent,args,{dataSources}){
            return dataSources.agentService.updateAgentWorkers(args);
        },
        deleteWorker(parent,{id},{dataSources}){
            return dataSources.workerService.deleteWorkerById(id);
        
        },
        bookAWorker(parent,args,{dataSources}){
            return dataSources.bookingService.createBooking(args);
        },
        login(parent,args,{dataSources}){
            return dataSources.userService.login(args);
        },
        profile(parent,args,{dataSources}){
            return dataSources.userService.getProfile(args);
        },
        createFeedback(parent,args,{dataSources}){
            return dataSources.feedbackService.createFeedback(args)
        }
    },
    Query:{
        
        customers:(parent,args,{dataSources},info)=>{
            return dataSources.customerService.getCustomers();

        },
        findCustomersById:(parent,{_id},{dataSources},info)=>{
            return dataSources.customerService.getCustomerById(_id)
        },
        workers:(parent,args,{dataSources},info)=>{
            return dataSources.workerService.getAllWorkers();
        },
        findWorkerById:(parent,{id},{dataSources},info)=>{
            return dataSources.workerService.getWorkerById(id);
        },
        agents:(parent,args,{dataSources},info)=>{
            return dataSources.agentService.getAllAgents();
        },
        findAgentsById:(parent,{id},{dataSources},info)=>{
            return dataSources.agentService.getAgentsById(id);
        },
        bookings:(parent,args,{dataSources},info)=>{
            return datasources.bookingService.getAllBookings()
        },
        feedbacks:(parent,args,{dataSources},info)=>{
            return dataSources.feedbackService.getAllFeedbacks();
        },
        sentFeedbacks:(parent,{id,role},{dataSources},info)=>{
            return dataSources.feedbackService.getSent(id,role);
        },
        receivedFeedbacks:(parent,{id},{dataSources},info)=>{
            return dataSources.feedbackService.getReceived(id);
        },
        rate:(parent,{id},{dataSources},info)=>{
            return dataSources.feedbackService.getUserRate(id);
        }
        
        
       
    },
   
    Worker:{
        async agent(workers,args,{dataSources},info){
            let agents = await dataSources.agentService.getAllAgents();
            let workedAgent = agents.find(agent=>{
                return agent.workers.includes(workers._id)
            });
            return workedAgent
        }
    },
    Booking:{
        async worker(bookings,args,{dataSources},info){
            let workers = await dataSources.workerService.getAllWorkers();
            let bookedWorker = workers.find(worker=>{
                console.log(worker._id )
                console.log(bookings)
                return worker._id === bookings.worker;
            })
            return bookedWorker;
        },async customer(bookings,args,{dataSources},info){
            let customers = await dataSources.customerService.getCustomers();
            let bookedCustomer = customers.find(customer=>{
                // console.log(worker._id )
                // console.log(bookings)
                return customer._id === bookings.customer;
            })
            return bookedCustomer;
        }
    }
}



const gqlServer = new ApolloServer({typeDefs,resolvers,dataSources});//create a server

gqlServer.listen({port:process.env.port || 4000})
.then(({url})=>console.log(`graphql server on port ${url}`)) //add port to server start