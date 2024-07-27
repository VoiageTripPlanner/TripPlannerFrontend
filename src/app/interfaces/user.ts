import { IAuthority } from ".";
import { ICountry } from "./country";
import { IRoleDefine } from "./role";

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  secondLastname?: string;
  email?: string;
  birthDate?: Date;
  password?: string;
  operational?: boolean;
  createAt?: string;
  updateAt?: string;
  authorities?: IAuthority[];
  countryId?: string;
  currencyId?: string;
  roleId?: number;
}
  