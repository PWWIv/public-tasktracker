import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    // Пример проверки учётных данных (заглушка)
    async validateUser(email: string, pass: string): Promise<any> {
        console.log('validateUser called with:', email, pass);
        const user = await this.usersService.findByEmail(email);
        console.log('Found user:', user);
        if (!user) {
            return null;
        }
        if (user.password !== pass) {
            return null;
        }
        return { userId: user.id, email: user.email, role: user.role };
    }

    // Метод, который выдаёт токен на основе данных пользователя
    async login(user: any) {
        // Обычно payload содержит userId, роли и т.п.
        const payload = { email: user.email, sub: user.userId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
