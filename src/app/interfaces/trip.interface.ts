import { ICurrency } from "./currency.interface";
import { IVoiageFlight } from "./flights.interface";
import { IVoiageLodge } from "./lodge.interface";
import { IActivity } from './activities.interface';
import { IVoiageRestaurant } from "./food.interface";
import { ILocation } from "./location.interface";
import { IAudit } from "./audit.interface";

export interface ITripForm{
    q:                  string;
    check_in_date:      Date;
    check_out_date:     Date;
    location:           ILocation;
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
    return_date:        Date;
    budget? :           number;
    currency?:          ICurrency;
    lodge:              IVoiageLodge; 
    flight:             IVoiageFlight; // IFlights: ver lo de separarlo en departure y return flight
    food:               IVoiageRestaurant[]; 
    activities:         IActivity[] 
    user_id:            number;
    ai_suggestions?:    string;

    //Propiedades de auditoria
    audit?: IAudit;
}