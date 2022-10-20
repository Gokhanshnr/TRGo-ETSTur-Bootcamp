export interface Picture {
        createdDate: any;
        lastModifiedDate: any;
        lid: number;
        file: string;
    }

    export interface Room {
        room_id: number;
        product_id: number;
        name: string;
        description: string;
        bed: number;
        price: number;
        quantity: number;
        pictures: Picture[];
    }

    export interface Location {
        lid: number;
        city: string;
        district: string;
    }

    export interface Picture2 {
        createdDate: any;
        lastModifiedDate: any;
        lid: number;
        file: string;
    }

    export interface Taxonomy {
        taxid: number;
        name: string;
        description: string;
    }

    export interface RESULT {
        createdDate: any;
        lastModifiedDate: any;
        pid: number;
        otel_name: string;
        rooms: Room[];
        description: string;
        location: Location;
        pictures: Picture2[];
        taxonomies: Taxonomy[];
        star_ratings: number;
    }

    export interface IProduct {
        STATUS: boolean;
        RESULT: RESULT[];
    }
