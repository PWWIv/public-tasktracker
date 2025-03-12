import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findByRole(role: string): Promise<User[]> {
        return this.userRepository.find({ where: { role } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Пользователь не найден');
        }
        return { message: 'Пользователь удален' };
    }

    async update(id: string, updateUserDto: Partial<CreateUserDto>) {
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { id } });
        if (!updatedUser) {
            throw new NotFoundException('Пользователь не найден');
        }
        return updatedUser;
    }
}
