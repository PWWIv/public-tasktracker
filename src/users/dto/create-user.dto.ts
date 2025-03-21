import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
    @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым' })
    @IsString({ message: 'Имя пользователя должно быть строкой' })
    username: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    @IsEmail({}, { message: 'Некорректный email' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Пароль пользователя для авторизации' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    password: string;

    @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
    @IsNotEmpty({ message: 'Роль не должна быть пустой' })
    @IsString({ message: 'Роль должна быть строкой' })
    role: string;

    @ApiProperty({ example: 'encrypted_password', description: 'AES-зашифрованный пароль' })
    @IsString({ message: 'Зашифрованный пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Зашифрованный пароль не должен быть пустым' })
    encryptedPassword: string;
}
