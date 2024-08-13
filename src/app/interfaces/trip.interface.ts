import { ICurrency } from "./currency.interface";
import { IFlights, IVoiageFlight } from "./flights.interface";
import { Flight } from './google-flights-response.interface';
import { IVoiageLodge } from "./lodge.interface";
import { IFoodBusiness } from "./yelp-food-response.interface";
import { IActivity } from './activities.interface';
import { IVoiageRestaurant } from "./food.interface";

export interface ITripForm{
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
    trip_id:            number;
    trip_name:          string;
    trip_description:   string;
    departure_city?:    string;
    departure_date:     Date;
    destination_city:   string;
    return_date?:        Date;
    budget? :           number;
    currency?:          ICurrency;
    lodge:              IVoiageLodge; 
    flight:             IVoiageFlight; // IFlights: ver lo de separarlo en departure y return flight
    food:               IVoiageRestaurant[]; 
    activities:         IActivity[] 
    user_id:            number;
    ai_suggestions?:    string;


    //Propiedades de auditoria
    creation_datetime             : Date;
    creation_responsible          : number;
    lastUpdate_datetime?          : Date;
    update_responsible?           : number;

}