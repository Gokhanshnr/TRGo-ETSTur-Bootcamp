export interface RESULT {
    lid: number;
    city: string;
    district: string;
}

export interface RootObject {
    STATUS: boolean;
    RESULT: RESULT;
}
