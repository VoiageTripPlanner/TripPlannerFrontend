
export interface IAutoComplete {
    address:     string;
    name:        string;
    id:          string;
    location:    IAutoCompleteLocation;
    latitude: number;
    longitude: number;
    imageUrl:    string;
    rating:      number;
    website:     string;
    pricelevel?: number;
}

export interface IAutoCompleteLocation {
    lat: number;
    lng: number;
}
