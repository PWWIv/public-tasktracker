import { ApiProperty } from '@nestjs/swagger';

export class EncryptedPasswordDto {
    @ApiProperty({ example: 'encrypted_password', description: 'Зашифрованный пароль пользователя' })
    password: string;
} 