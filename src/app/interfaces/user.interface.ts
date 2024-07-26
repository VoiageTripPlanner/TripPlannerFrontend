import { IAuthority } from "./index.interface";
import { ICountry } from "./country.interface";
import { IRoleDefine } from "./role.interface";

export interface IUser {
    user_id?: number;
    name?: string;
    last_name?: string;
    second_last_name?: string;
    country?:ICountry;
    email?: string;
    password?: string;
    operational?:boolean;
    creation_datetime?: Date;
    creation_responsible?:number;
    last_update_datetime?: Date;
    update_responsible?:number;
    authorities?: IAuthority[];
    role?:IRoleDefine;
  }
  