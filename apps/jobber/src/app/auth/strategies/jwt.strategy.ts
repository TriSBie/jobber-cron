import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: any) => request.cookies?.Authentication || request.token]),
            secretOrKey: configService.getOrThrow('AUTH_JWT_SECRET'),
        })
    }

    validate(payload: TokenPayload) {
        return payload;
    }
}           