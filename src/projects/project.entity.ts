import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClientEntity } from '../clients/client.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProjectEntity {
    @ApiProperty({ description: 'Уникальный идентификатор проекта' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Название проекта' })
    @Column()
    name: string;

    @ApiProperty({ description: 'Описание проекта' })
    @Column()
    description: string;

    @ApiProperty({ description: 'Дата создания проекта' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({ description: 'Дата последнего обновления проекта' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ApiProperty({ description: 'Связанный клиент' })
    @ManyToOne(() => ClientEntity, client => client.projects)
    @JoinColumn({ name: 'clientId' })
    client: ClientEntity;

    @Column()
    clientId: string;
} 