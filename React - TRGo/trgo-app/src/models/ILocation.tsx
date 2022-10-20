export interface RESULT {
    count: number;
    district: string;
    city: string;
    lid: number;
}

export interface ILocation {
    STATUS?: boolean;
    RESULT?: RESULT[];
    statuscode?:    number;
    error?:     string;
    message?:   string;
    path?:      string;
}