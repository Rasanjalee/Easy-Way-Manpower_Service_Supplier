import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        userRole: any;
        userId: any;
        location: any;
        accessToken: string;
    }>;
    loggedIn(data: any): Promise<any>;
}
