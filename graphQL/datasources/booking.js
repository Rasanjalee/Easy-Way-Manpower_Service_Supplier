const {RESTDataSource} = require('apollo-datasource-rest')

class BookingService extends RESTDataSource{
    constructor(){
        super();
        this.baseURL='http://localhost:3003'
    }

    async getAllBookings(){
        return await this.get(`/bookings`)
    }
    async getBookingById(id){
        return await this.get(`/bookings/${id}`);    
    }
    async createBooking(args){
        return await this.post(`/bookings`,args);
    }
}
module.exports = BookingService;