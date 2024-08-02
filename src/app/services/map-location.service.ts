import { Injectable, signal, Signal } from '@angular/core';
import { BaseService } from './base-service';
import { ILocation } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class MapLocationService extends BaseService<ILocation> {

  constructor() {
    super();
  }

  private locationListSignal = signal<ILocation[]>([]);
  private locationSignal = signal<ILocation>({} as ILocation);

  public get locations$() {
    return this.locationListSignal;
  };

  public get locationSig(): Signal<ILocation> {
    return this.locationSignal;
  };
  
  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.locationListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching locations', error);
      }
    });
  };
}
