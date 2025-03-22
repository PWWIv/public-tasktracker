import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ProjectEntity } from '../projects/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ClientEntity {
    @ApiProperty({ description: 'Уникальный идентификатор клиента' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Название организации' })
    @Column()
    organizationName: string;

    @ApiProperty({ description: 'Номер телефона' })
    @Column()
    phone: string;

    @ApiProperty({ description: 'Email адрес' })
    @Column()
    email: string;

    @ApiProperty({ description: 'Связанный пользователь' })
    @ManyToOne(() => UserEntity, user => user.client)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    userId: string;

    @ApiProperty({ description: 'Список проектов клиента' })
    @OneToMany(() => ProjectEntity, project => project.client)
    projects: ProjectEntity[];
} 