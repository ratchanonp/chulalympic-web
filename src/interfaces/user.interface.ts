export interface User {
    id: number | undefined;
    username: string;
    name: string;
    role: Role
    createdAt: string;
}

export interface CreateUser extends Omit<User, 'createdAt'> {
    password: string;
    confirmPassword: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    REPORTER = 'REPORTER'
}