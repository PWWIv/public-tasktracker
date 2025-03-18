import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Вход в систему' })
    @ApiResponse({
        status: 200,
        description: 'Успешный вход в систему',
        schema: { example: { access_token: 'your.jwt.token.here' } },
    })
    @ApiResponse({ status: 401, description: 'Неверные учётные данные' })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Неверные учётные данные');
        }
        return this.authService.login(user);
    }
}

@Controller('profile')
export class ProfileController {
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получение профиля пользователя' })
    @ApiResponse({
        status: 200,
        description: 'Доступ к защищённому маршруту',
        schema: { example: { message: 'Защищённый маршрут' } },
    })
    getProfile() {
        return { message: 'Защищённый маршрут' };
    }
}
