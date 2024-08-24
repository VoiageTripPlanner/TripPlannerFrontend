export interface IGoogleResponse {
  type?: string;
  name?: string;
  link?: string;
  gps_coordinates?: IHotelsGpsCoordinates;
  rate_per_night?: IHotelsRatePerNight;
  total_rate?: IHotelsRatePerNight;
  prices?: IHotelsPrice[];
  nearby_places?: IHotelsNearbyPlace[];
  images?: IHotelsImage[];
  overall_rating?: number;
  reviews?: number;
  location_rating?: number;
  amenities?: string[];
  excluded_amenities?: string[];
  essential_info?: string[];
  property_token?: string;
  serpapi_property_details_link?: string;
  check_in_time?: string;
  check_out_time?: string;
  description?: string;
  ratings?: IHotelsRating[];
  hotel_class?: string;
  extracted_hotel_class?: number;
  deal?: string;
  deal_description?: string;
}

export interface IHotelsGpsCoordinates {
  latitude: number;
  longitude: number;
}

export interface IHotelsImage {
  thumbnail: string;
  original_image: string;
}

export interface IHotelsNearbyPlace {
  name: string;
  transportations: IHotelsTransportationType[];
}

export interface IHotelsTransportation {
  type: IHotelsTransportationType;
  duration: string;
}

export enum IHotelsTransportationType {
  PublicTransport = "Public transport",
  Taxi = "Taxi",
  Walking = "Walking",
}

export interface IHotelsPrice {
  source: string;
  logo: string;
  num_guests: number;
  rate_per_night: IHotelsRatePerNight;
  official?: boolean;
}

export interface IHotelsRatePerNight {
  lowest: string;
  extracted_lowest: number;
  before_taxes_fees: string;
  extracted_before_taxes_fees: number;
}

export interface IHotelsRating {
  stars: number;
  count: number;
}

export interface ISearchParameters {
  engine?: string;
  q?: string;
  gl?: string;
  hl?: string;
  currency?: string;
  check_in_date?: String;
  check_out_date?: String;
  adults?: number;
  children?: number;
  api_key?: string;
}

export interface ISerpapiPagination {
  current_from: number;
  current_to: number;
  next_page_token: string;
  next: string;
}

// sort_by  3precio menor   8mwjoe rating  13mas visto

// amenities  number
