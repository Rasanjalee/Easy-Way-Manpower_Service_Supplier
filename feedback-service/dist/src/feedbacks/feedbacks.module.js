"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const feedback_repository_1 = require("./feedback.repository");
const feedbacks_controller_1 = require("./feedbacks.controller");
const feedbacks_service_1 = require("./feedbacks.service");
const feedback_schema_1 = require("./schemas/feedback.schema");
const microservices_1 = require("@nestjs/microservices");
let FeedbacksModule = class FeedbacksModule {
};
FeedbacksModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Feedback', schema: feedback_schema_1.FeedbackSchema }]),
            microservices_1.ClientsModule.register([{
                    name: 'AUTH_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4000
                    }
                }]),
            microservices_1.ClientsModule.register([{
                    name: 'USER_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4010
                    }
                }])
        ],
        controllers: [feedbacks_controller_1.FeedbacksController],
        providers: [feedbacks_service_1.FeedbacksService, feedback_repository_1.FeedbackRepository]
    })
], FeedbacksModule);
exports.FeedbacksModule = FeedbacksModule;
//# sourceMappingURL=feedbacks.module.js.map