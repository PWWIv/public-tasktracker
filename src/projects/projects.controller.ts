import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectEntity } from './project.entity';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @ApiOperation({ summary: 'Создание нового проекта' })
    @ApiResponse({ status: 201, description: 'Проект успешно создан' })
    @ApiResponse({ status: 403, description: 'Доступ запрещен' })
    @Roles('admin', 'employee')
    async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получение списка проектов' })
    @ApiResponse({ status: 200, description: 'Список проектов успешно получен' })
    @Roles('admin', 'employee', 'client')
    async findAll(): Promise<ProjectEntity[]> {
        return this.projectsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получение информации о проекте' })
    @ApiResponse({ status: 200, description: 'Информация о проекте успешно получена' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @Roles('admin', 'employee', 'client')
    async findOne(@Param('id') id: string): Promise<ProjectEntity> {
        return this.projectsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновление информации о проекте' })
    @ApiResponse({ status: 200, description: 'Информация о проекте успешно обновлена' })
    @ApiResponse({ status: 403, description: 'Доступ запрещен' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @Roles('admin', 'employee')
    async update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
        @Request() req
    ): Promise<ProjectEntity> {
        return this.projectsService.update(id, updateProjectDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удаление проекта' })
    @ApiResponse({ status: 200, description: 'Проект успешно удален' })
    @ApiResponse({ status: 403, description: 'Доступ запрещен' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @Roles('admin', 'employee')
    async remove(@Param('id') id: string, @Request() req): Promise<void> {
        return this.projectsService.remove(id, req.user);
    }
} 