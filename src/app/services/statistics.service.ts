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
  private countryVisitsList = signal<CountryVisit[]>([]);
  private budgetOverview = signal<IBudgetPrices | null>(null);

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

  public getCountryVisitsList(userId: number): void {
    this.httpService.get<CountryVisit[]>(`statistics/countryVisits/${userId}`)
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

  public getTripBudgetOverview(userId: number): void {
    this.httpService.get<IBudgetPrices>(`statistics/budgetOverview/${userId}`)
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
