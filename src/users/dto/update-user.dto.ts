import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
    @IsString({ message: 'Имя пользователя должно быть строкой' })
    @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым' })
    username: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    @IsEmail({}, { message: 'Некорректный email' })
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    password: string;

    @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
    @IsString({ message: 'Роль должна быть строкой' })
    @IsNotEmpty({ message: 'Роль не должна быть пустой' })
    role?: 'admin' | 'employee' | 'client';
}