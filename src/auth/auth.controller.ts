import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Вход в систему' })
    @ApiResponse({ status: 200, description: 'Успешный вход в систему' })
    @ApiResponse({ status: 401, description: 'Неверные учётные данные' })
    async login(@Body() loginDto: { email: string; password: string }) {
        const user = await this.authService.validateUser(
            loginDto.email,
            loginDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('Неверные учётные данные');
        }
        // Возвращаем объект вида { access_token: '...' }
        return this.authService.login(user);
    }
}

@Controller('profile')
export class ProfileController {
    @Get()
    @UseGuards(JwtAuthGuard)
    getProfile() {
        return { message: 'Защищённый маршрут' };
    }
}
