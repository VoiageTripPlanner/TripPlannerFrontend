import { ILocation } from "./location.interface";

export interface IVoiageRestaurant{


    restaurantId?            : number;
    name                     : string;
    description              : string;
    date?                    : Date;
    average_price            : number;
    location                 : ILocation;

    //Atributo que no persite en la bd
    yelpId?                  : string;
    restaurantImage?         : string;


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