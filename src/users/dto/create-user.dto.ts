import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым' })
    @IsString({ message: 'Имя пользователя должно быть строкой' })
    username: string;

    @IsNotEmpty({ message: 'Email не должен быть пустым' })
    @IsEmail({}, { message: 'Некорректный email' })
    email: string;

    @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
    @IsString({ message: 'Пароль должен быть строкой' })
    password: string;

    @IsNotEmpty({ message: 'Роль не должна быть пустой' })
    @IsString({ message: 'Роль должна быть строкой' })
    role: string;
}
