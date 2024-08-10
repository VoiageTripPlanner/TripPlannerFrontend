import { IAudit } from "./audit.interface";

export interface ILocation {
id?: number;
longitude?: number;
latitude?: number;
address?: string;
placeId?: string;
audit?: IAudit;
}