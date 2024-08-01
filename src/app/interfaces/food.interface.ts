import { ILocationMark } from "./location-mark.interface";

export interface IVoiageRestaurant{

    restaurant_id            : number;
    trip_id?                 : number;
    name                     : string;
    description              : string;
    date?                    : Date;
    average_price            : number;
    location_mark            : ILocationMark;


    //Propiedades de auditoria
    creation_datetime             : Date;
    creation_responsible          : number;
    lastUpdate_datetime?          : Date;
    update_responsible?           : number;
}