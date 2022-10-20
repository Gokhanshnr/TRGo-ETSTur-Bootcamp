export interface ITaxonomy {
    STATUS?: boolean;
    RESULT?: RESULT[];
    STATUSCODE?:    number;
    ERROR?:     string;
    MESSAGE?:   string;
    PATH?:      string;
}

export interface RESULT {
    count: number;
    name: string;
    taxid: number;
    description: string;
}


