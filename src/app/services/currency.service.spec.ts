import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICountry } from '../interfaces/country.interface';
import { CurrencyService } from './currency.service';
import { ICurrency } from '../interfaces/currency.interface';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all countries', () => {
    const mockCountries: ICurrency[] = [
      { id: '1', name: 'Currency 1', code: 'AAA', currencySymbol: '$' },
      { id: '2', name: 'Currency 2', code: 'AAA', currencySymbol: '$' }
    ];

    service.getAllSignal();
    
    const req = httpMock.expectOne('currency?s=');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);

    expect(service.currenciesSig()).toEqual(mockCountries);
  });

  it('should handle error when fetching countries', () => {
    service.getAllSignal();

    const req = httpMock.expectOne('currency?s=');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('network error'));

    expect(service.currenciesSig()).toEqual([]);
  });
});