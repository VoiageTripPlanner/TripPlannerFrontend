import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { CountryVisit } from '../interfaces/country-visit.interface';
import { IBudgetPrices } from '../interfaces/budget.interface';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private httpService: HttpClient = inject(HttpClient);
  private topCountries = signal<CountryVisit[]>([]);
  private countryVisitsList = signal<CountryVisit[]>([]);
  private budgetOverview = signal<IBudgetPrices | null>(null);

  public get topCountries$(): Observable<CountryVisit[]> {
    return toObservable(this.topCountries);
  }

  public get countryVisitsList$(): Observable<CountryVisit[]> {
    return toObservable(this.countryVisitsList);
  }

  public get budgetOverviewSig(): Signal<IBudgetPrices | null> {
    return this.budgetOverview.asReadonly();
  }

  public getCountryTopoJson(): Observable<any> {
    return this.httpService.get<any>('https://unpkg.com/world-atlas/countries-50m.json');
  }

  public getCountryFlagCodeJson(): Observable<any> {
    return this.httpService.get<any>('https://flagcdn.com/en/codes.json');
  }

  public getTopCountries(): void {
    this.httpService.get<CountryVisit[]>('statistics/topCountryVisits')
      .subscribe({
        next: (data) => {
          if (data) {
            this.topCountries.set(data);
          } else {
            this.topCountries.set([]);
          }
        },
        error: (error) => {
          console.error('Error fetching recommendations', error);
        }
      })
  }

  public getCountryVisitsList(): void {
    this.httpService.get<CountryVisit[]>('statistics/countryVisits')
      .subscribe({
        next: (data) => {
          if (data) {
            this.countryVisitsList.set(data);
          } else {
            this.countryVisitsList.set([]);
          }
        },
        error: (error) => {
          console.error('Error fetching recommendations', error);
        }
      })
  }

  public getTripBudgetOverview(): void {
    this.httpService.get<IBudgetPrices>('statistics/budgetOverview')
      .subscribe({
        next: (data) => {
          if (data) {
            this.budgetOverview.set(data);
          } else {
            this.budgetOverview.set(null);
          }
        },
        error: (error) => {
          console.error('Error fetching recommendations', error);
        }
      });
  }
}
