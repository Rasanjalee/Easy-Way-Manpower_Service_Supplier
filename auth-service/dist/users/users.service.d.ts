import { Model } from 'mongoose';
import { User } from './user.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getAllUsers(): Promise<User[]>;
    findOne(username: string): Promise<User>;
    createuser(userCreateDto: any): Promise<User>;
}
