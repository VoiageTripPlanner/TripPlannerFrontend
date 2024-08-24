import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { IUserSignUp } from "../../../interfaces/user-signup.interface";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ICountry } from "../../../interfaces/country.interface";
import { map, Observable, of, startWith } from "rxjs";
import { ICurrency } from "../../../interfaces/currency.interface";
import { passwordMatchValidator } from "../../../validators/password-match.validator";
import { CountryService } from "../../../services/country.service";
import { CurrencyService } from "../../../services/currency.service";
import { IUser } from "../../../interfaces/user.interface";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})
export class SigUpComponent implements OnInit {
  public signUpError!: String;
  public validSignup!: boolean;
  private fb: FormBuilder = inject(FormBuilder);
  public signUpForm: FormGroup<IUserSignUp>;
  public filteredCountries$!: Observable<ICountry[]>;
  public displayCountryName: ((value: any) => string) | null = (value) => {
    return (
      this.countryService.countriesSig().find((country) => country.id === value)
        ?.name ?? ""
    );
  };
  public filteredCurrencies$!: Observable<ICurrency[]>;
  public displayCurrencyName: ((value: any) => string) | null = (value) => {
    return (
      this.currencyService
        .currenciesSig()
        .find((currency) => currency.id === value)?.name ?? ""
    );
  };
  public readonly currentYear: number;
  public readonly maxDate: Date;
  public user: IUser = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private countryService: CountryService,
    private currencyService: CurrencyService,
  ) {
    this.currentYear = new Date().getFullYear();
    this.maxDate = new Date(this.currentYear - 10, 0, 1);
    this.signUpForm = this.fb.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      secondLastname: [""],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      birthDate: [this.maxDate, Validators.required],
      password: ["", Validators.required],
      passwordConfirmed: ["", Validators.required],
      countryId: ["", Validators.required],
      currencyId: ["", Validators.required],
    });
    this.signUpForm
      .get("passwordConfirmed")
      ?.addValidators(passwordMatchValidator(this.signUpForm));
    this.countryService.getAllSignal();
    this.currencyService.getAllSignal();
  }

  public ngOnInit(): void {
    this.filteredCountries$ =
      this.signUpForm.get("countryId")?.valueChanges.pipe(
        startWith(""),
        map((value) => this.filterCountries(value || "")),
      ) ?? of([]);
    this.filteredCurrencies$ =
      this.signUpForm.get("currencyId")?.valueChanges.pipe(
        startWith(""),
        map((value) => this.filterCurrencies(value || "")),
      ) ?? of([]);
  }

  public handleSignup(event: Event) {
    event.preventDefault();
    const { passwordConfirmed, ...user } = this.signUpForm.value;
    this.authService.signup(user as IUser).subscribe({
      next: () => {
        this.validSignup = true;
        this.router.navigateByUrl("/login");
      },
      error: (err: any) => (this.signUpError = err.description),
    });
  }

  public updateCurrency(event: any): void {
    const countryId: string = this.signUpForm.get("countryId")?.value ?? "";
    const countrySelected: ICountry | undefined = this.countryService
      .countriesSig()
      .find((country) => country.id === countryId);
    this.signUpForm
      .get("currencyId")
      ?.patchValue(String(countrySelected?.currencyId));
  }

  private filterCountries(value: string): ICountry[] {
    return this.countryService
      .countriesSig()
      .filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase()),
      );
  }

  private filterCurrencies(value: string): ICurrency[] {
    return this.currencyService
      .currenciesSig()
      .filter((currency) =>
        currency.name.toLowerCase().includes(value.toLowerCase()),
      );
  }
}
