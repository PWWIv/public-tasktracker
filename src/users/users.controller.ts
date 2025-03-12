import { Controller, Post, Delete, Put, Param, Get, Patch, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * Endpoint для регистрации нового пользователя.
     * - Админ может создавать пользователей с любой ролью.
     * - Сотрудник может создавать только пользователей с ролью 'client'.
     */
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'employee')
    async create(@Request() req, @Body() createUserDto: CreateUserDto) {
        const creatorRole = req.user.role; // роль того, кто создаёт пользователя
        // Если создатель — сотрудник, разрешаем создавать только клиента
        if (creatorRole === 'employee' && createUserDto.role !== 'client') {
            throw new UnauthorizedException('Сотрудник может создавать только пользователей с ролью клиент');
        }
        return this.usersService.create(createUserDto);
    }

    @Delete(':id')
    @Roles('admin') // Удалять может только админ
    async remove(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }

    @Patch(':id')
    @Roles('admin', 'employee') // Админ и сотрудник могут редактировать
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

}
