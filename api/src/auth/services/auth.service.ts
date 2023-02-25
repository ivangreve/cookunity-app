import { sign } from 'jsonwebtoken';
import { jwtConstants } from '../constants';
import { UserService } from './user.service';

export class AuthService {
    constructor(private userService: UserService) { }

    async signPayload(payload: any) {
        const token = sign(payload, jwtConstants.secret, { expiresIn: '12h' });
        return token;
    }

    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }
}