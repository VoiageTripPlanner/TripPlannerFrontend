import { Injectable, signal, Signal } from '@angular/core';
import { BaseService } from './base-service';
import { ILocation } from '../interfaces/location.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MapLocationService extends BaseService<ILocation> {
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

  getOneSignal(id: string) {
    this.find(id).subscribe({
      next: (response: any) => {
        this.locationSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching location', error);
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
        console.error('Error fetching locations', error);
      }
    });
  };

  saveLocation(location: ILocation): Observable<any> {
    return this.add(location).pipe(
      tap((response: any) => {
        this.locationListSignal.update(locations => [response, ...locations])
    }),
    catchError(error => {
      console.error('Error saving location', error);
      return throwError(error);
      })
    );
  };

  deleteLocation(location: ILocation): Observable<any> {
    return this.logicDelete(location.id, location).pipe(
      tap((response: any) => {
        const deletedLocation = this.locationListSignal().map(loc => loc.id === location.id ? response : loc);
        console.log(deletedLocation);
        this.locationListSignal.set(deletedLocation);
      }),
      catchError(error => {
        console.error('Error deleting location', error);
        return throwError(error);
      })
    );
  }
}
