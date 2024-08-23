import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { map, Observable, of, startWith } from 'rxjs';
import { ICountry } from '../../interfaces/country.interface';
import { ICurrency } from '../../interfaces/currency.interface';
import { CountryService } from '../../services/country.service';
import { CurrencyService } from '../../services/currency.service';
import { IUserUpdate } from '../../interfaces/user-update.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotifyService } from '../../shared/notify/notify.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ModalComponent,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  public userService : UserService = inject(UserService);
  private fb: FormBuilder = inject(FormBuilder);
  public updateUserForm: FormGroup<IUserUpdate>;
  public filteredCountries$!: Observable<ICountry[]>;
  public displayCountryName: ((value: any) => string) | null = (value) => {
    return this.countryService.countriesSig().find(country => country.id === value)?.name ?? ''
  };
  public filteredCurrencies$!: Observable<ICurrency[]>;
  public displayCurrencyName: ((value: any) => string) | null = (value) => {
    return this.currencyService.currenciesSig().find(currency => currency.id === value)?.name ?? ''
  };
  public readonly currentYear: number;
  public readonly maxDate: Date;
  private userId: number = Number(localStorage.getItem('userId'));

  constructor(
    private router: Router,
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private notifyService: NotifyService
  ) {
    this.currentYear = new Date().getFullYear();
      this.maxDate = new Date(this.currentYear - 10, 0, 1);
      this.updateUserForm = this.fb.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        secondLastname: [''],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        birthDate: [this.maxDate, Validators.required],
        countryId: ['', Validators.required],
        currencyId: ['', Validators.required]
      });
      this.userService.getUserById(this.userId);
      this.updateUserForm.get('email')?.disable();
      this.updateUserForm.get('birthDate')?.disable();
      effect(() => {
        this.updateForm(this.userService.userSig());
        if (this.countryService.countriesSig().length > 0) {
          this.updateUserForm.get('countryId')?.patchValue(this.userService.userSig().countryId ?? '');
        }
      });
  }

  public ngOnInit(): void {
    this.filteredCountries$ = this.updateUserForm.get('countryId')?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCountries(value || ''))
    ) ?? of([]);
    this.filteredCurrencies$ = this.updateUserForm.get('currencyId')?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCurrencies(value || ''))
    ) ?? of([]);
  }

  public handleUpdate(event: Event) {
    event.preventDefault();
    const user = {id: this.userId, ...this.updateUserForm.getRawValue()};
    this.userService.updateUserSignal(user as IUser).subscribe(() => {
      this.notifyService.onSuccess()
    });
  }

  private isIUser(user: IUser): user is IUser {
    return user !== undefined;
  }

  private updateForm(user: IUser) {
    if (this.isIUser(user)) {
      this.updateUserForm.setValue({
        name: user.name ?? '',
        lastname: user.lastname ?? '',
        secondLastname: user.secondLastname ?? '',
        email: user.email ?? '',
        birthDate: user.birthDate ?? this.maxDate,
        countryId: user.countryId ?? '',
        currencyId: user.currencyId ?? '',
      });
    }
  }

  public updateCurrency(event: any): void {
    const countryId: string = this.updateUserForm.get('countryId')?.value ?? '';
    const countrySelected: ICountry|undefined = this.countryService.countriesSig().find(country => country.id === countryId);
    this.updateUserForm.get('currencyId')?.patchValue(String(countrySelected?.currencyId));
  }

  private filterCountries(value: string): ICountry[] {
    return this.countryService.countriesSig().filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
  }

  private filterCurrencies(value: string): ICurrency[] {
    return this.currencyService.currenciesSig().filter(currency => currency.name.toLowerCase().includes(value.toLowerCase()));
  }
}
