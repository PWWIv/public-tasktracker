import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
    ) {}

    async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        const project = this.projectRepository.create(createProjectDto);
        return this.projectRepository.save(project);
    }

    async findAll(): Promise<ProjectEntity[]> {
        return this.projectRepository.find({
            relations: ['client'],
        });
    }

    async findOne(id: string): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['client'],
        });

        if (!project) {
            throw new NotFoundException(`Проект с ID ${id} не найден`);
        }

        return project;
    }

    async update(
        id: string,
        updateProjectDto: UpdateProjectDto,
        user: UserEntity,
    ): Promise<ProjectEntity> {
        const project = await this.findOne(id);

        // Проверка прав доступа
        if (user.role !== 'admin' && project.clientId !== user.client.id) {
            throw new ForbiddenException('У вас нет прав для обновления этого проекта');
        }

        Object.assign(project, updateProjectDto);
        return this.projectRepository.save(project);
    }

    async remove(id: string, user: UserEntity): Promise<void> {
        const project = await this.findOne(id);

        // Проверка прав доступа
        if (user.role !== 'admin' && project.clientId !== user.client.id) {
            throw new ForbiddenException('У вас нет прав для удаления этого проекта');
        }

        await this.projectRepository.remove(project);
    }
} 