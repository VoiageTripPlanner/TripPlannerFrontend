import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { CountryVisit } from '../interfaces/country-visit.interface';
import { IBudgetPrices } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private httpService: HttpClient = inject(HttpClient);

  public getCountryTopoJson(): Observable<any> {
    return this.httpService.get<any>('https://unpkg.com/world-atlas/countries-50m.json');
  }

  public getCountryFlagCodeJson(): Observable<any> {
    return this.httpService.get<any>('https://flagcdn.com/en/codes.json');
  }

  public getTopCountries(): Observable<CountryVisit[]> {
    const countries: CountryVisit[] = [
      { id: 1, name: 'United States', visits: 100 },
      { id: 2, name: 'Germany', visits: 50 },
      { id: 3, name: 'Costa Rica', visits: 30 },
    ];
    return from([countries]);
  }

  public getTripBudgetOverview(): Observable<IBudgetPrices> {
    const budget: IBudgetPrices = {
      flightAmount: 10000,
      lodgeAmount: 5000,
      foodAmount: 30000,
      activitiesAmount: 1000,
      otherAmount: 5000,
      total: 12000500,
    };
    return of(budget);
  }
}
