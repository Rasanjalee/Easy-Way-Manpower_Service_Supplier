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
exports.FeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const feedback_repository_1 = require("./feedback.repository");
const microservices_1 = require("@nestjs/microservices");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let FeedbacksService = class FeedbacksService {
    constructor(feedbackRepository, client) {
        this.feedbackRepository = feedbackRepository;
        this.client = client;
    }
    async getAllFeedbacks() {
        return await this.feedbackRepository.findAll();
    }
    async createFeedback(creteFeedbackDto) {
        return await this.feedbackRepository.create(creteFeedbackDto);
    }
    async searchFeedbacks(feedbackSearchDto) {
        return await this.feedbackRepository.search(feedbackSearchDto);
    }
    async getUserRate(id) {
        return await this.feedbackRepository.getRate(id);
    }
    async getSent(id, role) {
        const feedbacks = await this.feedbackRepository.getSent(id);
        let feedbackDeatil = [];
        if (role == 'customer') {
            await Promise.all(feedbacks.map(async (feedback) => {
                let searchId = feedback.feedbackTo;
                try {
                    console.log(searchId);
                    const toDeatils = await this.client.send({ cmd: 'get worker deatails by id' }, { searchId })
                        .pipe(operators_1.timeout(5000), operators_1.catchError(err => {
                        if (err instanceof rxjs_1.TimeoutError) {
                            return rxjs_1.throwError(new common_1.RequestTimeoutException());
                        }
                        return rxjs_1.throwError(err);
                    }))
                        .toPromise();
                    if (toDeatils) {
                        feedbackDeatil.push({
                            "feedbackTo": toDeatils.firstName + ' ' + toDeatils.lastName,
                            "feedbackRate": feedback.feedbackRate,
                            "feedbackMessage": feedback.feedbackMessage,
                            "feedbackToImage": toDeatils.image
                        });
                    }
                    console.log(toDeatils);
                }
                catch (e) {
                    common_1.Logger.log(e);
                }
                finally {
                    console.log(feedbackDeatil);
                }
            }));
        }
        return feedbackDeatil;
    }
    async getReceived(id, role) {
        const feedbacks = await this.feedbackRepository.getReceived(id);
        let feedbackDeatil = [];
        if (role == 'customer') {
            await Promise.all(feedbacks.map(async (feedback) => {
                let searchId = feedback.feedbackBy;
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
                        feedbackDeatil.push({
                            "feedbackBy": toDeatils.firstName + ' ' + toDeatils.lastName,
                            "feedbackRate": feedback.feedbackRate,
                            "feedbackMessage": feedback.feedbackMessage,
                            "feedbackToImage": toDeatils.image
                        });
                    }
                }
                catch (e) {
                    common_1.Logger.log(e);
                }
                finally {
                    console.log(feedbackDeatil);
                }
            }));
        }
        else if (role = 'worker') {
            await Promise.all(feedbacks.map(async (feedback) => {
                let searchId = feedback.feedbackBy;
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
                        feedbackDeatil.push({
                            "feedbackBy": toDeatils.firstName + ' ' + toDeatils.lastName,
                            "feedbackRate": feedback.feedbackRate,
                            "feedbackMessage": feedback.feedbackMessage,
                            "feedbackToImage": toDeatils.image
                        });
                    }
                }
                catch (e) {
                    common_1.Logger.log(e);
                }
                finally {
                    console.log(feedbackDeatil);
                }
            }));
        }
        return feedbackDeatil;
    }
};
FeedbacksService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject('USER_CLIENT')),
    __metadata("design:paramtypes", [feedback_repository_1.FeedbackRepository, microservices_1.ClientProxy])
], FeedbacksService);
exports.FeedbacksService = FeedbacksService;
//# sourceMappingURL=feedbacks.service.js.map