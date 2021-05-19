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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
let BookingsController = class BookingsController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    getAllBookings() {
        return this.bookingService.getAllBookings();
    }
    createBooking(createBookingDto) {
        console.log(createBookingDto);
        const createdBooking = this.bookingService.createBooking(createBookingDto);
        if (!createdBooking) {
            return new common_1.HttpException("not Created", 204);
        }
        return createdBooking;
    }
    async getBookingById(id) {
        console.log(id);
        const booking = await this.bookingService.getBookingById(id);
        return booking;
    }
    deleteBooking(id) {
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "getAllBookings", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "createBooking", null);
__decorate([
    common_1.Get('customer/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookingById", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "deleteBooking", null);
BookingsController = __decorate([
    common_1.Controller('booking'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
exports.BookingsController = BookingsController;
//# sourceMappingURL=bookings.controller.js.map