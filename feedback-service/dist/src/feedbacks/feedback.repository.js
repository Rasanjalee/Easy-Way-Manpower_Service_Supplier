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
exports.FeedbackRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const feedback_schema_1 = require("./schemas/feedback.schema");
let FeedbackRepository = class FeedbackRepository {
    constructor(feedbackModel) {
        this.feedbackModel = feedbackModel;
    }
    async create(createFeedabckDto) {
        let newFeedback = new this.feedbackModel(createFeedabckDto);
        return await newFeedback.save();
    }
    async findAll() {
        return await this.feedbackModel.find();
    }
    async search(feedbackSearchDto) {
        const searchFeedback = new this.feedbackModel(feedbackSearchDto);
        let feedbacks = await this.findAll();
        if (searchFeedback.feedbackBy) {
            feedbacks = feedbacks.filter((feedback) => feedback.feedbackBy.includes(searchFeedback.feedbackBy) || feedback.feedbackTo.includes(searchFeedback.feedbackBy));
        }
        if (searchFeedback.feedbackRate) {
            feedbacks = feedbacks.filter((feedback) => feedback.feedbackRate == searchFeedback.feedbackRate);
        }
        return feedbacks;
    }
    async getRate(id) {
        let feedbacks = await this.findAll();
        let rates = 0;
        let avgRate = 0;
        let selectedUserFeedbacks = feedbacks.filter((feedback) => feedback.feedbackTo == id);
        console.log(selectedUserFeedbacks);
        if (selectedUserFeedbacks.length > 0) {
            selectedUserFeedbacks.forEach((feedback) => {
                rates += feedback.feedbackRate;
            });
            avgRate = rates / selectedUserFeedbacks.length;
        }
        else {
            return 0;
        }
        return Math.round(avgRate);
    }
    async getSent(id) {
        let feedbacks = await this.feedbackModel.find();
        feedbacks.filter((feedback) => feedback.feedbackBy == id);
        return feedbacks;
    }
    async getReceived(id) {
        let feedbacks = await this.feedbackModel.find();
        return feedbacks.filter((feedback) => feedback.feedbackTo == id);
    }
};
FeedbackRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(feedback_schema_1.Feedback.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeedbackRepository);
exports.FeedbackRepository = FeedbackRepository;
//# sourceMappingURL=feedback.repository.js.map