import { ILocation } from "./location.interface";

export interface IActivity{

    id?: string;  
    name?: string;
    imageUrl?: string;
    location?: ILocation;
    rating?: number;
    types?: string;
    pricelevel?: number;
    website?: string;
}


// export interface IVoigeActivity{
// }
