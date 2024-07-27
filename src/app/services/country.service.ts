import { Injectable, Signal, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends BaseService<ICountry> {
  protected override source: string = 'country';
  private countryListSig = signal<ICountry[]>([]);

  public get countriesSig(): Signal<ICountry[]> {
    return this.countryListSig;
  }

  public getAllSignal(): void {
    this.findAll().subscribe({
      next: (response: any) => {
        if (response) {
          this.countryListSig.set(response);
        } else {
          this.countryListSig.set([]);
        }
      },
      error: (error: any) => {
        console.error('Error fetching countries', error);
      }
    });
  }
}
