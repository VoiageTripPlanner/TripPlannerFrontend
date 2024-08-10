import { Injectable, signal, Signal } from '@angular/core';
import { BaseService } from './base-service';
import { ILocation } from '../interfaces/location.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapLocationService extends BaseService<ILocation> {
  protected override source = 'locations';
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
        throwError(error);
      }
    });
  };

  getOneSignal(id: string) {
    this.find(id).subscribe({
      next: (response: any) => {
        this.locationSignal.set(response);
      },
      error: (error: any) => {
        throwError(error);
      }
    });
  };

  getAllSignalDetailed() {
    this.findAllDetailed().subscribe({
      next: (response: any) => {
        this.locationListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        throwError(error);      
      }
    });
  };

  saveLocation(location: ILocation): void {
    this.add(location)
    .subscribe({
      next: (response) => {
        throw(response);
      },
      error: (error) => {
        throwError(error);
      }
    });  
  };

  deleteLocation(location: ILocation): Observable<any> {
    return this.logicDelete(location.id, location).pipe(
      tap((response: any) => {
        const deletedLocation = this.locationListSignal().map(loc => loc.id === location.id ? response : loc);
        this.locationListSignal.set(deletedLocation);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
