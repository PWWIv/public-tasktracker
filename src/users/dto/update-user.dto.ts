import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

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
    @IsOptional()
    password?: string;

    @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
    @IsString({ message: 'Роль должна быть строкой' })
    @IsNotEmpty({ message: 'Роль не должна быть пустой' })
    role?: 'admin' | 'employee' | 'client';

    @ApiProperty({ example: false, description: 'Флаг зашифрованного пароля' })
    @IsBoolean({ message: 'Флаг isEncrypted должен быть булевым значением' })
    @IsOptional()
    isEncrypted?: boolean;

    @ApiProperty({ example: 'encrypted_password', description: 'Зашифрованный пароль' })
    @IsString({ message: 'Зашифрованный пароль должен быть строкой' })
    @IsOptional()
    encryptedPassword?: string;
}