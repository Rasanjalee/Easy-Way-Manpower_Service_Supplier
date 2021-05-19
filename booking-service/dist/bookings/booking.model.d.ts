import { Document } from 'mongoose';
export interface Booking extends Document {
    id: string;
    bookingDate: Date;
    customer: string;
    worker: string;
    fromDate: string;
    toDate: string;
    bookingStatus: string;
}
export declare enum Status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DECLINE = "DECLINE",
    COMPLETE = "COMPLETE"
}
