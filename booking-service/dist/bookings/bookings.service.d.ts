import { Booking } from './booking.model';
import { BookingSearchDto } from './bookingSearch.dto';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
export declare class BookingsService {
    private readonly bookingModel;
    private readonly client;
    constructor(bookingModel: Model<Booking>, client: ClientProxy);
    getAllBookings(): Promise<Booking[]>;
    createBooking(createBookingDto: any): Promise<Booking>;
    searchBookings(bookingSearchDto: BookingSearchDto): void;
    getBookingById(id: string): Promise<any[]>;
    deletBooking(id: string): void;
}
