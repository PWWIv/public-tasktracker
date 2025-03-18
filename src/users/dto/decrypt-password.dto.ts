import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptPasswordDto {
    @ApiProperty({ example: 'password123', description: 'Пароль пользователя для повторной аутентификации' })
    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    @IsString({ message: 'Пароль должен быть строкой' })
    password: string;
} 