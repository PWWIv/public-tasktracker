import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Неверный формат email' })
    email: string;

    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    password: string;
}
