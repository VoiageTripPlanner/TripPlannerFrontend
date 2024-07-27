export interface IPlaceSearchResult {
    address: string;
    location?: google.maps.LatLng;
    latitude?: number;
    longitude?: number;
    imageUrl?: string;
    iconUrl?: string;
    name?: string;
  }