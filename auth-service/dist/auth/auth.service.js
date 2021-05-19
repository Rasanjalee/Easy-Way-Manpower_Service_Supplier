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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const bcrypt_1 = require("bcrypt");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AuthService = class AuthService {
    constructor(client, jwtService) {
        this.client = client;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        try {
            const user = await this.client.send({ role: 'customer', cmd: 'get' }, { username })
                .pipe(operators_1.timeout(5000), operators_1.catchError(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return rxjs_1.throwError(new common_1.RequestTimeoutException());
                }
                return rxjs_1.throwError(err);
            }))
                .toPromise();
            if (user) {
                if (bcrypt_1.compareSync(password, user === null || user === void 0 ? void 0 : user.password)) {
                    return user;
                }
            }
            const agent = await this.client.send({ role: 'agent', cmd: 'get' }, { username })
                .pipe(operators_1.timeout(5000), operators_1.catchError(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return rxjs_1.throwError(new common_1.RequestTimeoutException());
                }
                return rxjs_1.throwError(err);
            })).toPromise();
            if (agent) {
                if (bcrypt_1.compareSync(password, agent === null || agent === void 0 ? void 0 : agent.password)) {
                    return agent;
                }
            }
            const worker = await this.client.send({ role: 'worker', cmd: 'get' }, { username })
                .pipe(operators_1.timeout(5000), operators_1.catchError(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return rxjs_1.throwError(new common_1.RequestTimeoutException());
                }
                return rxjs_1.throwError(err);
            })).toPromise();
            if (worker) {
                if (bcrypt_1.compareSync(password, worker === null || worker === void 0 ? void 0 : worker.password)) {
                    return worker;
                }
            }
            return null;
        }
        catch (e) {
            common_1.Logger.log(e);
            throw e;
        }
    }
    async login(user) {
        let username = user.username;
        const payload = { sub: user._id };
        return {
            userRole: user.role,
            userId: user._id,
            location: user.location,
            accessToken: this.jwtService.sign(payload)
        };
    }
    validateToken(jwt) {
        return this.jwtService.verify(jwt);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_CLIENT')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map