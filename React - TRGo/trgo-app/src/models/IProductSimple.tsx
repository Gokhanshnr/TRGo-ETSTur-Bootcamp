export interface RESULT {
    rooms: string;
    starRatings: string;
    pid: number;
    location: string;
    otelName: string;
}

export interface IProductSimple {
    STATUS: boolean;
    RESULT: RESULT[];
}