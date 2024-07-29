export interface IPlaceSearchResult {
    address: string;
    name?: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    iconUrl?: string;
    location?: google.maps.LatLng;
    rating?: number;
    types?: string[];
    pricelevel?: number;
  }
  export interface IOpenAIResponse {
    content?: string;
  }