"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
const mongoose = require("mongoose");
exports.BookingSchema = new mongoose.Schema({
    id: String,
    customer: String,
    worker: String,
    bookingDate: Date,
    fromDate: String,
    toDate: String,
    bookingStatus: String
});
//# sourceMappingURL=booking.schema.js.map