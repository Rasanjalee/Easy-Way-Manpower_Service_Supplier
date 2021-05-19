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
exports.FeedbacksController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_guard_1 = require("../guards/auth.guard");
const createFeedback_dto_1 = require("./createFeedback.dto");
const feedbacks_service_1 = require("./feedbacks.service");
let FeedbacksController = class FeedbacksController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    async getAllFeedBacks(param) {
        return await this.feedbackService.getAllFeedbacks();
    }
    async createFeedback(createFeedbackDto) {
        return await this.feedbackService.createFeedback(createFeedbackDto);
    }
    async getUserRate(data) {
        console.log(data.id);
        const rate = await this.feedbackService.getUserRate(data.id);
        console.log(rate);
        return rate;
    }
    async getSent(id, role) {
        return await this.feedbackService.getSent(id, role);
    }
    async getReceived(id, role) {
        return await this.feedbackService.getReceived(id, role);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "getAllFeedBacks", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFeedback_dto_1.CreateFeedbackDto]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "createFeedback", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'getUserRate' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "getUserRate", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('/sent/:id/:role'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "getSent", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('/received/:id/:role'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "getReceived", null);
FeedbacksController = __decorate([
    common_1.Controller('feedbacks'),
    __metadata("design:paramtypes", [feedbacks_service_1.FeedbacksService])
], FeedbacksController);
exports.FeedbacksController = FeedbacksController;
//# sourceMappingURL=feedbacks.controller.js.map