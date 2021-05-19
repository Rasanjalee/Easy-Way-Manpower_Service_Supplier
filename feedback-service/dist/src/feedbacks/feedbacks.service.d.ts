import { FeedbackSearchDto } from './feedbackSearch.dto';
import { FeedbackRepository } from './feedback.repository';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './createFeedback.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class FeedbacksService {
    private feedbackRepository;
    private readonly client;
    constructor(feedbackRepository: FeedbackRepository, client: ClientProxy);
    getAllFeedbacks(): Promise<Feedback[]>;
    createFeedback(creteFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    searchFeedbacks(feedbackSearchDto: FeedbackSearchDto): Promise<Feedback[]>;
    getUserRate(id: string): Promise<number>;
    getSent(id: string, role: string): Promise<any[]>;
    getReceived(id: string, role: string): Promise<any[]>;
}
