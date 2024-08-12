import { IAudit } from "./audit.interface";

export interface ILocation {
  id?: number;
  LatLng?: {
    longitude?: number;
    latitude?: number;
  };
  address?: string;
  placeId?: string;
  audit?: IAudit;
}