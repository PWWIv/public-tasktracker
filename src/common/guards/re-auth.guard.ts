import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ReAuthGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        console.log('ReAuthGuard - Full request:', {
            headers: request.headers,
            body: request.body,
            user: request.user
        });

        const user = request.user;
        const { password } = request.body;

        console.log('ReAuthGuard - User from request:', user);
        console.log('ReAuthGuard - Password from request:', password);

        if (!user || !user.userId || !password) {
            console.log('ReAuthGuard - Missing user or password', {
                hasUser: !!user,
                hasUserId: !!user?.userId,
                hasPassword: !!password,
                user: user,
                password: password
            });
            throw new UnauthorizedException('Необходима повторная аутентификация');
        }

        const dbUser = await this.usersService.findOne(user.userId);
        console.log('ReAuthGuard - User from database:', dbUser);

        if (!dbUser) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        const isMatch = await bcrypt.compare(password, dbUser.password);
        console.log('ReAuthGuard - Password match:', isMatch);

        if (!isMatch) {
            throw new UnauthorizedException('Неверный пароль');
        }

        return true;
    }
} 