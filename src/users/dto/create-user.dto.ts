export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    role?: 'admin' | 'employee' | 'client';
}
