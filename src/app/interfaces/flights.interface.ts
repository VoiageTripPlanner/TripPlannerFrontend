export interface Airport {  
    name?                           : string;
    id?                             : string;
    time?                           : string;
}

export interface IVoiageFlight{
    flight_id                      : number;
    duration                        : number;
    airline_name                    : string;
    airline_logo                    : string;
    travel_class                    : string;
    flight_number                   : string;
    start_date                      : Date;
    end_date?                       : Date;
    created_at                      : Date;
    booking_token                   : string;
    isLayover                       : boolean;
    total_duration                  : number;
    price                           : number;
    type                            : string;
    departure_airport               : Airport;
    arrival_airport                 : Airport;
    layovers?                       : IVoiageFlight[];
    parentFlight?                   : IVoiageFlight;
    showLayovers?: boolean;
}
