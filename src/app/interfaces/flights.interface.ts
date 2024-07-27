//Ordenar y comparar con los datos que necesito el backend
export interface IFlights{
    departure_airport?              :Airport;
    arrival_airport?                :Airport;
    duration?                       :number;
    airline?                        :string;
    airline_logo?                   :string;
    travel_class?                   :string;
    flight_number?                  :string;
    outbound_date?                  :Date;
    return_date?                    :Date;
    total_duration?                 :number;
    price?                          :number;
    type?                           :string;
    booking_token?                  :string;
    google_flights_url?             :string;
    created_at?                     :string;
}

export interface Airport {  
    name?                           :string;
    id?                             :string;
    time?                           :string;
}

