import { HttpException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './createBooking.dto';
export declare class BookingsController {
    private bookingService;
    constructor(bookingService: BookingsService);
    getAllBookings(): Promise<import("./booking.model").Booking[]>;
    createBooking(createBookingDto: CreateBookingDto): Promise<import("./booking.model").Booking> | HttpException;
    getBookingById(id: string): Promise<any[]>;
    deleteBooking(id: string): void;
}
