import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findByRole(role: string): Promise<UserEntity[]> {
        return this.userRepository.find({ where: { role } });
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOne(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 — количество раундов соли
        const userData = { ...createUserDto, password: hashedPassword };
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    }

    async remove(id: string) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Пользователь не найден');
        }
        return { message: 'Пользователь удален' };
    }

    async update(id: string, updateUserDto: Partial<CreateUserDto>) {
        // Если обновляется пароль, его тоже нужно захэшировать
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { id } });
        if (!updatedUser) {
            throw new NotFoundException('Пользователь не найден');
        }
        return updatedUser;
    }
}
