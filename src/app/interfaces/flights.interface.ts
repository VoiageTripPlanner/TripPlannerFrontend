//Ordenar y comparar con los datos que necesito el backend
export interface IFlights{
    departure_airport?              : Airport;
    arrival_airport?                : Airport;
    duration?                       : number;
    airline?                        : string;
    airline_logo?                   : string;
    travel_class?                   : string;
    flight_number?                  : string;
    outbound_date?                  : Date;
    return_date?                    : Date;
    total_duration?                 : number;
    price?                          : number;
    type?                           : string;
    booking_token?                  : string;
    google_flights_url?             : string;
    created_at?                     : string;
}

export interface Airport {  
    name?                           : string;
    id?                             : string;
    time?                           : string;
}


export interface IVoiageFlight{
    flight_id                       : number;
    departure_airport               : Airport;
    arrival_airport                 : Airport;
    airline                         : string;
    airline_logo                    : string;
    travel_class                    : string;
    flight_number                   : string;
    start_date                      : Date;
    end_date                        : Date;
    booking_token                   : string;
    price                           : number;
    type                            : string;
    isLayover                       : boolean;
    duration                        : number;
    outbound_date                   : Date;
    return_date?                    : Date;
    google_flights_link             : string;
    total_duration                  : number;
    layovers                        : IFlights[];

    //Propiedades de auditoria
    created_at                      : Date;
    // creation_responsible            : number;
    // lastUpdate_datetime?            : Date;
    // update_responsible?             : number;
    // operational                     : number;
}
