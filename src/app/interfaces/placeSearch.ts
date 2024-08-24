export interface IPlaceSearchResult {
  id?: string;
  address: string;
  name?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  location?: google.maps.LatLng;
  rating?: number;
  pricelevel?: number;
  website?: string;
}
export interface IOpenAIResponse {
  content?: string;
}
