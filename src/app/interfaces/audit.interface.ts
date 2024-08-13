import { IUser } from "./user.interface";

export interface IAudit {
    creationDatetime: Date;
    creationResponsible: IUser;
    lastUpdateDatetime: Date;
    updateResponsible: IUser;
}