export interface ILocation{
    id?       : number;
    LatLng: {
        latitude  : number;
        longitude : number;
    };
    address?      : string;
    place_id?     : string;
    user_id?      : number;
}