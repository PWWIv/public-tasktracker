import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ClientEntity } from '../clients/client.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') // Используем UUID
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    encryptedPassword: string;

    @Column()
    role: string;

    @OneToOne(() => ClientEntity, client => client.user)
    client: ClientEntity;
}
