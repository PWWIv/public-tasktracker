import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchClientsDto {
    @ApiProperty({ example: 'Компания', description: 'Поисковый запрос', required: false })
    @IsString({ message: 'Поисковый запрос должен быть строкой' })
    @IsOptional()
    search?: string;

    @ApiProperty({ example: 1, description: 'Номер страницы', required: false })
    @Type(() => Number)
    @IsInt({ message: 'Номер страницы должен быть целым числом' })
    @Min(1, { message: 'Номер страницы должен быть больше 0' })
    @IsOptional()
    page?: number = 1;

    @ApiProperty({ example: 10, description: 'Количество элементов на странице', required: false })
    @Type(() => Number)
    @IsInt({ message: 'Количество элементов должно быть целым числом' })
    @Min(1, { message: 'Количество элементов должно быть больше 0' })
    @IsOptional()
    limit?: number = 10;
} 