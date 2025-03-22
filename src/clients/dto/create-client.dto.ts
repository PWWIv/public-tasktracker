import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty({ example: 'ООО "Компания"', description: 'Название организации' })
    @IsString({ message: 'Название организации должно быть строкой' })
    @IsNotEmpty({ message: 'Название организации не должно быть пустым' })
    organizationName: string;

    @ApiProperty({ example: '+7 (999) 123-45-67', description: 'Телефон' })
    @IsString({ message: 'Телефон должен быть строкой' })
    @IsNotEmpty({ message: 'Телефон не должен быть пустым' })
    phone: string;

    @ApiProperty({ example: 'client@company.com', description: 'Email' })
    @IsEmail({}, { message: 'Некорректный email' })
    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    email: string;

    @ApiProperty({ example: 'user-uuid', description: 'ID пользователя-клиента' })
    @IsString({ message: 'ID пользователя должен быть строкой' })
    @IsNotEmpty({ message: 'ID пользователя не должен быть пустым' })
    userId: string;
} 