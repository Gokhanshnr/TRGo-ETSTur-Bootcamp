export interface RESULT {
    orderid: number;
    id: number;
    room_id: number;
    otel_name: string;
    room_name: string;
    start_date: Date;
    end_Date: Date;
    person: number;
    price: number;
}

export interface IOrder {
    MESSAGE: number;
    STATUS: boolean;
    RESULT: RESULT[];
}