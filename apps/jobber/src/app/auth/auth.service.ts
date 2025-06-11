import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    async authenticateauthenticate({ email, password }: LoginInput, res: Response) {
        const user = await this.verifyUser(email, password);
        const expires = new Date();

        expires.setMilliseconds(expires.getTime() + parseInt(this.configService.getOrThrow('AUTH_JWT_EXPIRATIONS_MS')));

        const tokenPayload: TokenPayload = {
            userId: user.id,
        }

        const accessToken = this.jwtService.sign(tokenPayload);

        // Attaches the JWT to the response
        res.cookie('Authentication', accessToken, {
            httpOnly: true,
            secure: !!this.configService.get('AUTH_JWT_SECURE'),
            expires
        });

        return user;
    }

    private async verifyUser(email: string, password: string) {
        try {
            const user = await this.userService.getUser({
                email,
            });

            const authenticated = await compare(password, user.password);
            if (!authenticated) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
