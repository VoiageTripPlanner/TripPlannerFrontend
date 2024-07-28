import { IAuthority } from "./index.interface";
import { ICountry } from "./country.interface";
import { IRoleDefine } from "./role.interface";

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
  