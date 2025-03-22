import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
    @ApiProperty({ example: 'ООО "Компания"', description: 'Название организации', required: false })
    @IsString({ message: 'Название организации должно быть строкой' })
    @IsOptional()
    organizationName?: string;

    @ApiProperty({ example: '+7 (999) 123-45-67', description: 'Телефон', required: false })
    @IsString({ message: 'Телефон должен быть строкой' })
    @IsOptional()
    phone?: string;

    @ApiProperty({ example: 'client@company.com', description: 'Email', required: false })
    @IsEmail({}, { message: 'Некорректный email' })
    @IsOptional()
    email?: string;
} 