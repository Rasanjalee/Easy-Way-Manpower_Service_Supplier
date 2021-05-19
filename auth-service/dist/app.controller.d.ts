import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        userRole: any;
        userId: any;
        location: any;
        accessToken: string;
    }>;
    getProfile(req: any): any;
}
