import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SearchClientsDto } from './dto/search-clients.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientEntity } from './client.entity';

@ApiTags('clients')
@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    @ApiOperation({ summary: 'Создание нового клиента' })
    @ApiResponse({ status: 201, description: 'Клиент успешно создан' })
    @ApiResponse({ status: 403, description: 'Доступ запрещен' })
    @Roles('admin', 'employee')
    async create(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получение списка клиентов' })
    @ApiResponse({ status: 200, description: 'Список клиентов успешно получен' })
    @Roles('admin', 'employee', 'client')
    async findAll(@Query() searchDto: SearchClientsDto): Promise<{ clients: ClientEntity[]; total: number }> {
        return this.clientsService.findAll(searchDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получение информации о клиенте' })
    @ApiResponse({ status: 200, description: 'Информация о клиенте успешно получена' })
    @ApiResponse({ status: 404, description: 'Клиент не найден' })
    @Roles('admin', 'employee', 'client')
    async findOne(@Param('id') id: string): Promise<ClientEntity> {
        return this.clientsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновление информации о клиенте' })
    @ApiResponse({ status: 200, description: 'Информация о клиенте успешно обновлена' })
    @ApiResponse({ status: 403, description: 'Доступ запрещен' })
    @ApiResponse({ status: 404, description: 'Клиент не найден' })
    @Roles('admin', 'employee', 'client')
    async update(
        @Param('id') id: string,
        @Body() updateClientDto: UpdateClientDto,
        @Request() req
    ): Promise<ClientEntity> {
        return this.clientsService.update(id, updateClientDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удаление клиента' })
    @ApiResponse({ status: 200, description: 'Клиент успешно удален' })
    @ApiResponse({ status: 403, description: 'Доступ запрещен' })
    @ApiResponse({ status: 404, description: 'Клиент не найден' })
    @Roles('admin', 'employee')
    async remove(@Param('id') id: string, @Request() req): Promise<void> {
        return this.clientsService.remove(id, req.user);
    }
} 