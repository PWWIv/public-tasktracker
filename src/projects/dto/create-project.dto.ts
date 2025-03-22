import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ description: 'Название проекта' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Описание проекта' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'ID клиента' })
    @IsUUID()
    @IsNotEmpty()
    clientId: string;
} 