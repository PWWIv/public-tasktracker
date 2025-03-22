import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateProjectDto {
    @ApiProperty({ description: 'Название проекта', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Описание проекта', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'ID клиента', required: false })
    @IsUUID()
    @IsOptional()
    clientId?: string;
} 