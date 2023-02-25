export interface User {
    id: number;
    username: string;
    name: string;
    role: Role
    createdAt: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    REPORTER = 'REPORTER'
}