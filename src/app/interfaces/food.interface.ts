import { ILocationMark } from "./location-mark.interface";

export interface IVoiageRestaurant{


    restaurantId?            : number;
    name                     : string;
    description              : string;
    tripId?                  : number;  //revisar si lo espera o no en el backend
    averagePrice             : number;
    locationMark             : ILocationMark;   //TODO: REVISAR ESTO CON Ilocation

    //Atributo que no persite en la bd
    yelpId?                  : string;
    restaurantImage?         : string;
    addressLocation?         : string;
    locationCityCountry?     : string;   

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