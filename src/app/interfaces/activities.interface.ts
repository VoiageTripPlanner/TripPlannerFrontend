export interface IActivity{
    
    id?                     : number;
    address                 : string;
    googleId?               : string;  
    imageUrl?               : string;
    latitude?               : number;
    longitude?              : number;
    iconUrl?                : string;
    location?               : google.maps.LatLng;
    rating?                 : number;
    priceLevel?             : number;
    website?                : string;
    name?                   : string;
    types?                  : string;
}

