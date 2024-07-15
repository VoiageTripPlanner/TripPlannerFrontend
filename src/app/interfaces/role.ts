
export enum IRole {
    admin = "ROLE_ADMIN",
    user = "ROLE_USER",
    // superAdmin = 'ROLE_SUPER_ADMIN'
  }

export interface IRoleDefine  {
    role_id?:number;
    role_name?:string;
    abbreviation?:string;
    operational?:boolean;
    creation_datetime?:Date;
    creation_responsible?:number;
    last_update_datetime?:Date;
    update_responsible?:number;
}