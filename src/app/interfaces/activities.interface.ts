import { ILocation } from "./location.interface";

export interface IActivity{

    id?: string;  
    address: string;
    name?: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    location?: ILocation;
    rating?: number;
    types?: string;
    pricelevel?: number;
    website?: string;
}


// export interface IVoigeActivity{
// }
