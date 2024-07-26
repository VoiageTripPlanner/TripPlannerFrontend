import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends BaseService<ICountry> {
  protected override source: string = 'country';
  private countryListSignal = signal<ICountry>({});
  get country$() {
    return this.countryListSignal;
  }
  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.countryListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  }

}
