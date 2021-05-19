export interface CreateBookingDto {
    id: string;
    bookingDate: Date;
    customer: string;
    worker: string;
    fromDate: string;
    toDate: string;
    bookingStatus: string;
}
