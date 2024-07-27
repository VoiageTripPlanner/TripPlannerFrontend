import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../services/auth.service';
import { CountryService } from '../../../services/country.service';
import { CurrencyService } from '../../../services/currency.service';
import { SigUpComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';
import { IUser } from '../../../interfaces/user.interface';
import { ICountry } from '../../../interfaces/country.interface';
import { ICurrency } from '../../../interfaces/currency.interface';
import { ILoginResponse } from '../../../interfaces/index.interface';


describe('SigUpComponent', () => {
  let component: SigUpComponent;
  let fixture: ComponentFixture<SigUpComponent>;
  let authService: AuthService;
  let countryService: CountryService;
  let currencyService: CurrencyService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        NoopAnimationsModule
      ],
      providers: [AuthService, CountryService, CurrencyService, importProvidersFrom(MatNativeDateModule)]
    }).compileComponents();

    fixture = TestBed.createComponent(SigUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    countryService = TestBed.inject(CountryService);
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle the form submit', () => {
    const loginResponseStub: ILoginResponse = {accessToken: '', expiresIn: 100000}
    const signupSpy = jest.spyOn(component['authService'], 'signup').mockReturnValue(of(loginResponseStub));
    const eventStub = new Event('');
    component.signUpForm.patchValue(userStub);
    fixture.detectChanges();

    component.handleSignup(eventStub);

    expect(signupSpy).toHaveBeenCalledWith(userStub);
    expect(component.validSignup).toBeTruthy();
  });

  it('should filter countries with given value', () => {
    let countryListFiltered: ICountry[];
    const countryListExpect: ICountry[] = [
      {
        id: '1',
        name: 'Costa Rica',
        code: 'CRC',
        currencyId: '27'
      },
      {
        id: '3',
        name: 'Colombia',
        code: 'COL',
        currencyId: '37'
      },
    ];
    jest.spyOn(component['countryService'], 'countriesSig').mockReturnValue(countryListStub);

    countryListFiltered = component['filterCountries']('co');

    expect(countryListFiltered).toEqual(countryListExpect);
  });

  it('should filter countries with given value', () => {
    let currencyListFiltered: ICurrency[];
    const currencyListExpect: ICurrency[] = [
      {
        id: '2',
        name: 'Dollar',
        code: 'USD',
        currencySymbol: '$'
      },
    ];
    jest.spyOn(component['currencyService'], 'currenciesSig').mockReturnValue(currencyListStub);

    currencyListFiltered = component['filterCurrencies']('Do');

    expect(currencyListFiltered).toEqual(currencyListExpect);
  });

  const userStub: IUser = {
    name: 'Tester',
    lastname: 'Tester',
    secondLastname: '',
    email: 'test@tester.com',
    birthDate: new Date('1991-03-12'),
    password: '123queso',
    countryId: '1',
    currencyId: '27'
  };
  const countryListStub: ICountry[] = [
    {
      id: '1',
      name: 'Costa Rica',
      code: 'CRC',
      currencyId: '27'
    },
    {
      id: '2',
      name: 'United States',
      code: 'USA',
      currencyId: '2'
    },
    {
      id: '3',
      name: 'Colombia',
      code: 'COL',
      currencyId: '37'
    },
  ];
  const currencyListStub: ICurrency[] = [
    {
      id: '2',
      name: 'Dollar',
      code: 'USD',
      currencySymbol: '$'
    },
    {
      id: '27',
      name: 'Colon',
      code: 'CRC',
      currencySymbol: '$'
    },
    {
      id: '37',
      name: 'Peso',
      code: 'COP',
      currencySymbol: '$'
    },
  ];

});