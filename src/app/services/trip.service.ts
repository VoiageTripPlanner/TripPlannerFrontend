import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { ITripForm } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<ICountry> {
  protected override source: string = 'trip';
  private countryListSignal = signal<ICountry>({});
  get country$() {
    return this.countryListSignal;
  }

  onGetDefaultTripForm (){
    const defaultValue:ITripForm={
      q:                '',
      check_in_date:    new Date(),
      check_out_date:   new Date(),
      latitude:         0,
      longitude:        0,
      departure_id:     '',
      arrival_id:       '',
      outbound_date:    new Date(),
      return_date:      new Date(),
      stops:            0,
      type:             0
    }

    return defaultValue;

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
  };

  // getAllSignalDetailed() {
  //   this.findAllDetailed().subscribe({
  //     next: (response: any) => {
  //       this.userListSignal.set(response);
  //       response.reverse();
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching users', error);
  //     }
  //   });
  // };


  // saveUserSignal (user: IUser): Observable<any>{
  //   return this.add(user).pipe(
  //     tap((response: any) => {
  //       this.userListSignal.update( users => [response, ...users]);
  //     }),
  //     catchError(error => {
  //       console.error('Error saving user', error);
  //       return throwError(error);
  //     })
  //   );
  // };

  // updateUserSignal (user: IUser): Observable<any>{
  //   return this.edit(user.user_id, user).pipe(
  //     tap((response: any) => {
  //       const updatedUsers = this.userListSignal().map(u => u.user_id === user.user_id ? response : u);
  //       this.userListSignal.set(updatedUsers);
  //     }),
  //     catchError(error => {
  //       console.error('Error saving user', error);
  //       return throwError(error);
  //     })
  //   );
  // };

  // deleteUserSignal (user: IUser): Observable<any>{
  //   return this.logicDelete(user.user_id,user).pipe(
  //     tap((response: any) => {
  //       const deletedUsers = this.userListSignal().map(u => u.user_id === user.user_id ? response : u);
  //       console.log(deletedUsers);
  //       this.userListSignal.set(deletedUsers);
  //     }),
  //     catchError(error => {
  //       console.error('Error saving user', error);
  //       return throwError(error);
  //     })
  //   );
  // };


}
