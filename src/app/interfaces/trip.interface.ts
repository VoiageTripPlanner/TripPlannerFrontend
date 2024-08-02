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