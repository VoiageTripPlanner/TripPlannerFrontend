export interface IPlaceSearchResult {
    address: string;
    name?: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    iconUrl?: string;
    //Cambiar a Location
    location?: google.maps.LatLng;
  }
  export interface IOpenAIResponse {
    content?: string;
  }