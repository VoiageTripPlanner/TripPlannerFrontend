import { ILocation } from "./location.interface";

export interface IActivity{
    
    id?                     : number;
    address                 : string;
    googleId?               : string;  
    imageUrl?               : string;
    latitude?               : number;
    longitude?              : number;
    iconUrl?                : string;
    location?               : ILocation;
    rating?                 : number;
    priceLevel?             : number;
    website?                : string;
    name?                   : string;
    types?                  : string;
}

