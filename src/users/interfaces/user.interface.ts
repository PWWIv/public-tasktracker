export interface User {
    username: string;
    id: number;
    email: string;
    password: string;
    role: 'admin' | 'employee' | 'client';
}