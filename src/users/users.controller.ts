import { Controller, Post, Delete, Put, Param, Get, Patch, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * Endpoint для регистрации нового пользователя.
     * - Админ может создавать пользователей с любой ролью.
     * - Сотрудник может создавать только пользователей с ролью 'client'.
     */
    @Post()
    @ApiOperation({ summary: 'Создание нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
    @ApiResponse({ status: 401, description: 'Неавторизованный доступ' })
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

    
    @Patch(':id')
    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен' })
    @ApiResponse({ status: 401, description: 'Неавторизованный доступ' })
    @Roles('admin', 'employee') // Админ и сотрудник могут редактировать
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получение списка всех пользователей' })
    @ApiResponse({ status: 200, description: 'Список пользователей успешно получен' })
    @ApiResponse({ status: 401, description: 'Неавторизованный доступ' })
    async findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно удален' })
    @ApiResponse({ status: 401, description: 'Неавторизованный доступ' })
    @Roles('admin') // Удалять может только админ
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
