import { ILocationMark } from "./location-mark.interface";

export interface IVoiageRestaurant{

    restaurant_id            : number;
    trip_id?                 : number;  //revisar si lo espera o no en el backend
    name                     : string;
    description              : string;
    average_price            : number;
    location_mark            : ILocationMark;   //TODO: REVISAR ESTO CON Ilocation

    //Atributo que no persite en la bd
    yelpId?                  : string;
    restaurant_image?        : string;


    //Propiedades de auditoria
    creationDatetime?        : Date;
    creationResponsible?     : number;
    lastUpdateDatetime?      : Date;
    updateResponsible?       : number;
}

export interface IRestaurantCategory{
    alias: string;
    title : string;

}

export interface IRestaurant{
    name        : string;
    categories  : IRestaurantCategory[];

}

export interface IEstimatedPrice{
    city                : string;
    chosenRestaurant    : IRestaurant[];
    startDate           : Date;
    endDate             : Date;
    currencyId          : number;
}