import { CreateFeedbackDto } from './createFeedback.dto';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackSearchDto } from './feedbackSearch.dto';
import { Feedback } from './schemas/feedback.schema';
export declare class FeedbacksController {
    private feedbackService;
    constructor(feedbackService: FeedbacksService);
    getAllFeedBacks(param: FeedbackSearchDto): Promise<Feedback[]>;
    createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    getUserRate(data: any): Promise<number>;
    getSent(id: string, role: string): Promise<any[]>;
    getReceived(id: string, role: string): Promise<any[]>;
}
