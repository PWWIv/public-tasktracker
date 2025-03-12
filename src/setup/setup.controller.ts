import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('setup')
export class SetupController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create-admin')
    async createAdmin(@Body() createUserDto: CreateUserDto) {
        // Проверяем, существуют ли уже администраторы
        const admins = await this.usersService.findByRole('admin');
        if (admins.length > 0) {
            throw new ForbiddenException('Администратор уже существует');
        }
        // Если админа нет, принудительно задаём роль "admin"
        createUserDto.role = 'admin';
        return this.usersService.create(createUserDto);
    }
}
