import { Document } from 'mongoose';
export declare type FeedbackDocument = Feedback & Document;
export declare class Feedback {
    id: string;
    feedbackBy: string;
    feedbackTo: string;
    feedbackRate: number;
    feedbackMessage: string;
}
export declare const FeedbackSchema: import("mongoose").Schema<Document<Feedback, any>, import("mongoose").Model<any, any, any>, undefined>;
