export interface RESULT {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface IUserList {
    STATUS: boolean;
    RESULT: RESULT[];
}