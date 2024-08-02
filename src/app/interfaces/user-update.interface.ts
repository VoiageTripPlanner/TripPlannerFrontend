import { FormControl } from "@angular/forms";

export interface IUserUpdate {
  name: FormControl<string | null>;
  lastname: FormControl<string | null>;
  secondLastname: FormControl<string | null>;
  email: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  countryId: FormControl<string | null>;
  currencyId: FormControl<string | null>;
}