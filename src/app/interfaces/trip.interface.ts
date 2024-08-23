import { ICurrency } from "./currency.interface";
import { IFlights, IVoiageFlight } from "./flights.interface";
import { Flight } from './google-flights-response.interface';
import { IVoiageLodge } from "./lodge.interface";
import { IFoodBusiness } from "./yelp-food-response.interface";
import { IActivity } from './activities.interface';
import { IVoiageRestaurant } from "./food.interface";

export interface ITripForm {
    q:                  string;
    check_in_date:      Date;
    check_out_date:     Date;
    latitude:           number;
    longitude:          number;
    departure_id:       string;
    arrival_id:         string;
    outbound_date:      Date;
    return_date?:       Date; 
    stops:              number;
    type:               number;
    travel_class?:      number;
}

export interface ITrip{
    tripId:                         number;
    name:                           string;
    description:                    string;
    departureDate:                  Date;
    returnDate?:                    Date;
    budget? :                       number;
    user:                           number;
    currency?:                      number;  
    lodge:                          IVoiageLodge; 
    aiSuggestion?:                  string;
    flight:                         IVoiageFlight; 
    departureCity?:                 string;
    restaurants:                    IVoiageRestaurant[]; 
    activities:                     IActivity[] 
    destinationCity:                string;

    //Desglose de precios
    activitiesEstimatedCost? :      number; 
    restaurantsEstimatedCost?:      number;

    //Pais de destino
    destinationCountry:             ITripDestinationCountry;

    //Propiedades de auditoria
    creationDatetime:               Date;
    creationResponsible:            number;
    lastUpdateDatetime?:            Date;
    updateResponsible? :            number;



}

export interface ITripDestinationCountry{

    countryName: string;
    countryCode: string;
}