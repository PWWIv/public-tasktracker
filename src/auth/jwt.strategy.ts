import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        // Попытаемся получить секрет
        const secret = configService.get<string>('JWT_SECRET');

        // Если секрет не найден — выбросим ошибку (или зададим значение по умолчанию)
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
            // или:
            // secret = 'some-default-secret';
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret, // теперь это точно строка
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.username, role: payload.role };
    }
}
