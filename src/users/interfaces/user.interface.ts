export interface User {
    username: string;
    id: string;
    email: string;
    password: string;
    role: 'admin' | 'employee' | 'client';
}