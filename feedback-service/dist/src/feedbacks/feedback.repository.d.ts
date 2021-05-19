import { Model } from "mongoose";
import { CreateFeedbackDto } from "./createFeedback.dto";
import { FeedbackSearchDto } from "./feedbackSearch.dto";
import { Feedback, FeedbackDocument } from "./schemas/feedback.schema";
export declare class FeedbackRepository {
    private feedbackModel;
    constructor(feedbackModel: Model<FeedbackDocument>);
    create(createFeedabckDto: CreateFeedbackDto): Promise<Feedback>;
    findAll(): Promise<Feedback[]>;
    search(feedbackSearchDto: FeedbackSearchDto): Promise<Feedback[]>;
    getRate(id: string): Promise<number>;
    getSent(id: string): Promise<FeedbackDocument[]>;
    getReceived(id: string): Promise<Feedback[]>;
}
