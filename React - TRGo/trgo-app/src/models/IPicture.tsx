  export interface Result {
        createdDate: number;
        lastModifiedDate: number;
        lid: number;
        file: string;
    }

    export interface IPicture {
        status: boolean;
        result: Result;
    }

