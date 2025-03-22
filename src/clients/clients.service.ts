import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ClientEntity } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SearchClientsDto } from './dto/search-clients.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
        // Проверяем существование пользователя
        const user = await this.userRepository.findOne({ where: { id: createClientDto.userId } });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        // Проверяем, что пользователь имеет роль client
        if (user.role !== 'client') {
            throw new ForbiddenException('Пользователь должен иметь роль client');
        }

        // Проверяем, не существует ли уже клиент для этого пользователя
        const existingClient = await this.clientRepository.findOne({ where: { userId: createClientDto.userId } });
        if (existingClient) {
            throw new ForbiddenException('Клиент уже существует для этого пользователя');
        }

        const client = this.clientRepository.create(createClientDto);
        return await this.clientRepository.save(client);
    }

    async findAll(searchDto: SearchClientsDto): Promise<{ clients: ClientEntity[]; total: number }> {
        const { search, page = 1, limit = 10 } = searchDto;
        const skip = (page - 1) * limit;

        const queryBuilder = this.clientRepository.createQueryBuilder('client')
            .leftJoinAndSelect('client.user', 'user')
            .leftJoinAndSelect('client.projects', 'projects');

        if (search) {
            queryBuilder.where([
                { organizationName: Like(`%${search}%`) },
                { email: Like(`%${search}%`) },
                { phone: Like(`%${search}%`) }
            ]);
        }

        const [clients, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return { clients, total };
    }

    async findOne(id: string): Promise<ClientEntity> {
        const client = await this.clientRepository.findOne({
            where: { id },
            relations: ['user', 'projects']
        });
        if (!client) {
            throw new NotFoundException('Клиент не найден');
        }
        return client;
    }

    async update(id: string, updateClientDto: UpdateClientDto, currentUser: UserEntity): Promise<ClientEntity> {
        const client = await this.findOne(id);

        // Проверяем права доступа
        if (currentUser.role !== 'admin' && 
            currentUser.role !== 'employee' && 
            (currentUser.role === 'client' && client.userId !== currentUser.id)) {
            throw new ForbiddenException('У вас нет прав для редактирования этого клиента');
        }

        Object.assign(client, updateClientDto);
        return await this.clientRepository.save(client);
    }

    async remove(id: string, currentUser: UserEntity): Promise<void> {
        const client = await this.findOne(id);

        // Проверяем права доступа
        if (currentUser.role !== 'admin' && currentUser.role !== 'employee') {
            throw new ForbiddenException('У вас нет прав для удаления клиентов');
        }

        await this.clientRepository.remove(client);
    }
} 