import { ILocation } from "./location.interface";

export interface IPlaceSearchResult {
    address: string;
    name?: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    iconUrl?: string;
    location?: ILocation;
  }
  export interface IOpenAIResponse {
    content?: string;
  }