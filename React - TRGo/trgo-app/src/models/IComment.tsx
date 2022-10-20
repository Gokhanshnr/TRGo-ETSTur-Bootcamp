export interface RESULT {
    id: number;
    comment: string;
    rating: number;
    com_id: number;
    proid: number;
    last_name: string;
    first_name: string;
    cdate: number;
}

export interface IComment {
    STATUS: boolean;
    RESULT: RESULT[];
}