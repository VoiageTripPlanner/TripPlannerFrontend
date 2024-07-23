export interface IYelpActivities {
    businesses: Business[];
    total:      number;
    region:     Region;
}

export interface Business {
    id:             string;
    alias:          string;
    name:           string;
    image_url:      string;
    is_closed:      boolean;
    url:            string;
    review_count:   number;
    categories:     Category[];
    rating:         number;
    coordinates:    Center;
    transactions:   any[];
    price?:         Price;
    location:       Location;
    phone:          string;
    display_phone:  string;
    distance:       number;
    business_hours: BusinessHour[];
    attributes:     Attributes;
}

export interface Attributes {
    business_temp_closed: null;
    menu_url:             null | string;
    open24_hours?:        null;
    waitlist_reservation: null;
}

export interface BusinessHour {
    open:        Open[];
    hours_type:  HoursType;
    is_open_now: boolean;
}

export enum HoursType {
    Regular = "REGULAR",
}

export interface Open {
    is_overnight: boolean;
    start:        string;
    end:          string;
    day:          number;
}

export interface Category {
    alias: string;
    title: string;
}

export interface Center {
    latitude:  number;
    longitude: number;
}

export interface Location {
    address1:        string;
    address2:        string;
    address3:        null | string;
    city:            string;
    zip_code:        string;
    country:         Country;
    state:           string;
    display_address: string[];
}

export enum Country {
    Jp = "JP",
}

export enum Price {
    Empty = "￥",
    Price = "￥￥",
    Purple = "￥￥￥",
}

export interface Region {
    center: Center;
}
