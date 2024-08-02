import { IUser } from "./user.interface";

export interface IAudit {
    creation_datetime: Date;
    creation_responsible: IUser;
    lastUpdate_datetime: Date;
    update_responsible: IUser;
}