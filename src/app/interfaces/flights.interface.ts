//Ordenar y comparar con los datos que necesito el backend
export interface IFlights{
    duration?                       : number;
    airline?                        : string;
    airline_logo?                   : string;
    travel_class?                   : string;
    flight_number?                  : string;
    outbound_date?                  : Date;
    return_date?                    : Date;
    created_at?                     : Date;
    booking_token?                  : string;
    google_flights_link?            : string;
    isLayover                       : boolean;
    total_duration?                 : number;
    price?                          : number;
    type?                           : string;
    departure_airport?              : Airport;
    arrival_airport?                : Airport;
}

export interface Airport {  
    name?                           : string;
    id?                             : string;
    time?                           : string;
}


export interface IVoiageFlight{
    flight_id                       : number;
    duration                        : number;
    airline                         : string;
    airline_logo                    : string;
    travel_class                    : string;
    flight_number                   : string;
    outbound_date                   : Date;
    return_date?                    : Date;
    booking_token                   : string;
    google_flights_link             : string;
    isLayover                       : boolean;
    total_duration                  : number;
    price                           : number;
    type                            : string;
    departure_airport               : Airport;
    arrival_airport                 : Airport;
    layovers                        : IFlights[];
    start_date                      : Date;
    end_date                        : Date;

    //Propiedades de auditoria
    created_at                      : Date;
    // creation_responsible            : number;
    // lastUpdate_datetime?            : Date;
    // update_responsible?             : number;
    // operational                     : number;
}