import { ILocation } from "./location.interface";

  export interface IPlaceSearchResult {
    id?: string;  
    address: string;
    name?: string;
    imageUrl?: string;
    location?: ILocation;
    rating?: number;
    pricelevel?: number;
    website?: string;
  }
  export interface IOpenAIResponse {
    content?: string;
  }