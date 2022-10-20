export interface Role {
    id: number;
}

export interface IRegister {
    email: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    password: string;
    roles: Role[];
    tokenExpired: boolean;
}