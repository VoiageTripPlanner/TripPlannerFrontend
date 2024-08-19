import { IAudit } from "./audit.interface";
import { ILocation } from "./location.interface";

export interface IVoiageRestaurant{

    restaurant_id            : number;
    trip_id?                 : number;
    name                     : string;
    description              : string;
    date?                    : Date;
    average_price            : number;
    location                 : ILocation;

    //Atributo que no persite en la bd
    yelpId?                  : string;
    restaurant_image?        : string;

    audit                    : IAudit;
}