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
    departure_airport               : string;
    arrival_airport                 : string;
    airline                         : string;
    airline_logo                    : string;
    travel_class                    : string;
    flight_number                   : string;
    start_date                      : Date;
    end_date?                       : Date;
    booking_token                   : string;
    price                           : number;
    type                            : string;
    is_layover?                     : boolean;
    total_duration?                 : number; 

    //Propiedades de auditoria
    creation_datetime               : Date;
    creation_responsible            : number;
    lastUpdate_datetime?            : Date;
    update_responsible?             : number;
}
