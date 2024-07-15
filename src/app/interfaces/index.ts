export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
 
  id?: number;
  name?: string;
  last_name?: string;
  second_last_name?: string;
  country?: ICountry;
  email?: string;
  password?: string;
  operational?: boolean;
  creation_date?: string;
  creation_resposible?: number;
  last_update_datetime?: string;
  upodate_resposible?: number;
  authorities?: IAuthority[];
  otp?: string;

 
  // id?: number;
  // name?: string;
  // lastname?: string;
  // password?: string;
  // active?: boolean;
  // email?: string;
  // createdAt?: string;
  // updatedAt?: string;
  // authorities?: IAuthority[];
  // otp? : string;
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export interface ICountry {

  country_id?: number;
  country_name?: string;
  country_code?: string;
  operational?: boolean;
  
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRole {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
  superAdmin = 'ROLE_SUPER_ADMIN'
}