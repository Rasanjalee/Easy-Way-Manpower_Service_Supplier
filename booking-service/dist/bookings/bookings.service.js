"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const booking_model_1 = require("./booking.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let BookingsService = class BookingsService {
    constructor(bookingModel, client) {
        this.bookingModel = bookingModel;
        this.client = client;
    }
    async getAllBookings() {
        const bookings = await this.bookingModel.find().exec();
        if (!bookings || !bookings[0]) {
            throw new common_1.HttpException('No record found', 404);
        }
        return bookings;
    }
    async createBooking(createBookingDto) {
        console.log(createBookingDto);
        const newBooking = new this.bookingModel({
            worker: createBookingDto.worker,
            customer: createBookingDto.customer,
            bookingDate: new Date(),
            fromDate: createBookingDto.fromDate,
            toDate: createBookingDto.toDate,
            bookingStatus: booking_model_1.Status.PENDING
        });
        console.log(newBooking);
        return await newBooking.save();
    }
    searchBookings(bookingSearchDto) {
    }
    async getBookingById(id) {
        const bookings = await this.getAllBookings();
        let filteredBooking = [];
        bookings.find((booking) => {
            booking.worker === id;
        });
        console.log(bookings);
        await Promise.all(bookings.map(async (booking) => {
            let searchId = booking.worker;
            try {
                const toDeatils = await this.client.send({ cmd: 'get worker deatails by id' }, { searchId })
                    .pipe(operators_1.timeout(5000), operators_1.catchError(err => {
                    if (err instanceof rxjs_1.TimeoutError) {
                        return rxjs_1.throwError(new common_1.RequestTimeoutException());
                    }
                    return rxjs_1.throwError(err);
                }))
                    .toPromise();
                if (toDeatils) {
                    filteredBooking.push({
                        "bookingId": booking._id,
                        "bookingTo": toDeatils.firstName + ' ' + toDeatils.lastName,
                        "bookingDate": booking.bookingDate,
                        "bookingStatus": booking.bookingStatus,
                        "bookingFromDate": booking.fromDate,
                        "bookingToDate": booking.toDate,
                        "rate": toDeatils.rate
                    });
                    console.log(toDeatils);
                }
            }
            catch (e) {
                common_1.Logger.log(e);
            }
            finally {
            }
        }));
        return filteredBooking;
    }
    deletBooking(id) {
    }
};
BookingsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Booking')), __param(1, common_1.Inject('USER_CLIENT')),
    __metadata("design:paramtypes", [mongoose_2.Model, microservices_1.ClientProxy])
], BookingsService);
exports.BookingsService = BookingsService;
//# sourceMappingURL=bookings.service.js.map