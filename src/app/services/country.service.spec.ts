import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICountry } from '../interfaces/country.interface';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all countries', () => {
    const mockCountries: ICountry[] = [
      { id: '1', name: 'Country 1', code: 'AAA', currencyId: '2' },
      { id: '2', name: 'Country 2', code: 'AAA', currencyId: '2' }
    ];

    service.getAllSignal();
    
    const req = httpMock.expectOne('country?s=');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);

    expect(service.countriesSig()).toEqual(mockCountries);
  });

  it('should handle error when fetching countries', () => {
    service.getAllSignal();

    const req = httpMock.expectOne('country?s=');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('network error'));

    expect(service.countriesSig()).toEqual([]);
  });
});