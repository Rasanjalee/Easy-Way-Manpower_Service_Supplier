import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private readonly client;
    private jwtService;
    constructor(client: ClientProxy, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        userRole: any;
        userId: any;
        location: any;
        accessToken: string;
    }>;
    validateToken(jwt: string): any;
}
