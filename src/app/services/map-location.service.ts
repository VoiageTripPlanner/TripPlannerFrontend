import { inject, Injectable, signal, Signal } from '@angular/core';
import { BaseService } from './base-service';
import { ILocation } from '../interfaces/location.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NotifyService } from '../shared/notify/notify.service';

@Injectable({
  providedIn: 'root'
})
export class MapLocationService extends BaseService<ILocation> {
  protected override source = 'locations';
  private locationListSignal = signal<ILocation[]>([]);
  private locationSignal = signal<ILocation>({} as ILocation);
  private restaurantListSignal = signal<ILocation>(this.onGetDefaultVoiageLocationMark());
  notifyService=inject(NotifyService);

  onGetDefaultVoiageLocationMark(): ILocation {
  
      const defaultValue: ILocation = {
        id                      : 0,
        LatLng                  : {
          longitude             : 0,
          latitude              : 0,
        },
        address                 : '',
        placeId                 : '',
        audit                   : {
          creationDatetime     : new Date(),
          creationResponsible  : {id: 0},
          lastUpdateDatetime   : new Date(),
          updateResponsible    : {id: 0},
        }
      };
      return defaultValue;
    }

  public get locations$() {
    return this.locationListSignal;
  };

  public get locationSig(): Signal<ILocation> {
    return this.locationSignal;
  };

  public get restaurant$() {
    return this.restaurantListSignal;
  };

  public getAllRestauranSignal() {

    this.findAll().subscribe({
      next: (response: any) => {
        this.restaurantListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
        this.notifyService.onError();
      }
    });
  };
  
  public getAllSignal() {
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

  public getOneSignal(id: string) {
    this.find(id).subscribe({
      next: (response: any) => {
        this.locationSignal.set(response);
      },
      error: (error: any) => {
        throwError(error);
      }
    });
  };

  public getAllSignalDetailed() {
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

  public saveLocation(location: ILocation): void {
    this.add(location)
    .subscribe({
      next: (response) => {
        this.locationListSignal.set([...this.locationListSignal(), response.data]);
      },
      error: (error) => {
        throwError(error);
      }
    });  
  };

  public deleteLocation(location: ILocation): Observable<any> {
    return this.logicDelete(location.id, location).pipe(
      tap((response: any) => {
        const deletedLocation = this.locationListSignal().map(loc => loc.id === location.id ? response : loc);
        this.locationListSignal.set(deletedLocation);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  };
}
