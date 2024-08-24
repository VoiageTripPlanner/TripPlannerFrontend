import { FormControl } from "@angular/forms";

export interface IUserSignUp {
  name: FormControl<string | null>;
  lastname: FormControl<string | null>;
  secondLastname: FormControl<string | null>;
  email: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  password: FormControl<string | null>;
  passwordConfirmed: FormControl<string | null>;
  countryId: FormControl<string | null>;
  currencyId: FormControl<string | null>;
}
