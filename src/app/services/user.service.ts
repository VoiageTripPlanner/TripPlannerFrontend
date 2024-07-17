import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, forkJoin, tap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';
import { ICountry } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {
  protected override source: string = 'users';
  private userListSignal = signal<IUser[]>([]);
  private countryListSignal = signal<ICountry[]>([]);
  get users$() {
    return this.userListSignal;
  };

  getAllSignal() {

    this.findAll().subscribe({
      next: (response: any) => {
        this.userListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  };


  getAllSignalDetailed() {
    this.findAllDetailed().subscribe({
      next: (response: any) => {
        this.userListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  };


  saveUserSignal (user: IUser): Observable<any>{
    return this.add(user).pipe(
      tap((response: any) => {
        this.userListSignal.update( users => [response, ...users]);
      }),
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  };

  updateUserSignal (user: IUser): Observable<any>{
    return this.edit(user.user_id, user).pipe(
      tap((response: any) => {
        const updatedUsers = this.userListSignal().map(u => u.user_id === user.user_id ? response : u);
        this.userListSignal.set(updatedUsers);
      }),
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  };

  deleteUserSignal (user: IUser): Observable<any>{
    return this.logicDelete(user.user_id,user).pipe(
      tap((response: any) => {
        const deletedUsers = this.userListSignal().map(u => u.user_id === user.user_id ? response : u);
        console.log(deletedUsers);
        debugger;
        this.userListSignal.set(deletedUsers);
      }),
      catchError(error => {
        debugger;
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  }

  // deleteUserSignal (user: IUser): Observable<any>{
  //   return this.del(user.user_id).pipe(
  //     tap((response: any) => {
  //       const updatedUsers = this.userListSignal().filter(u => u.user_id !== user.user_id);
  //       this.userListSignal.set(updatedUsers);
  //     }),
  //     catchError(error => {
  //       console.error('Error saving user', error);
  //       return throwError(error);
  //     })
  //   );
  // };


}
