export interface IGFlightsResponse {
  Airport: any;
  search_metadata?: SearchMetadata;
  search_parameters?: SearchParameters;
  other_flights?: OtherFlight[];
  price_insights?: PriceInsights;
}

export interface OtherFlight {
  flights?: Flight[];
  layovers?: Layover[];
  total_duration?: number;
  carbon_emissions?: CarbonEmissions;
  price?: number;
  type?: string;
  airline_logo?: string;
  booking_token?: string;
}

export interface CarbonEmissions {
  this_flight?: number;
}

export interface Flight {
  departure_airport?: Airport;
  arrival_airport?: Airport;
  duration?: number;
  airplane?: string;
  airline?: string;
  airline_logo?: string;
  travel_class?: string;
  flight_number?: string;
  legroom?: string;
  extensions?: string[];
  often_delayed_by_over_30_min?: boolean;
  overnight?: boolean;
}

export interface Airport {
  name?: string;
  id?: string;
  time?: string;
}

export interface Layover {
  duration?: number;
  name?: string;
  id?: string;
  overnight?: boolean;
}

export interface PriceInsights {
  lowest_price?: number;
  price_level?: string;
  typical_price_range?: number[];
}

export interface SearchMetadata {
  id?: string;
  status?: string;
  json_endpoint?: string;
  created_at?: string;
  processed_at?: string;
  google_flights_url?: string;
  raw_html_file?: string;
  prettify_html_file?: string;
  total_time_taken?: number;
}

export interface SearchParameters {
  engine?: string;
  hl?: string;
  gl?: string;
  type?: string;
  currency?: string;
  departure_id?: string;
  arrival_id?: string;
  outbound_date?: String;
  return_date?: String;
  travel_class?: number;
  stops?: number;
}

export interface ISerpapiPagination {
  next_page_token: string;
  next: string;
}
