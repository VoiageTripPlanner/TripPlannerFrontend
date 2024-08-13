import { Injectable, Signal, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, forkJoin, tap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {
  protected override source: string = 'users';
  private userListSignal = signal<IUser[]>([]);
  private userSignal = signal<IUser>({} as IUser);
  private countryListSignal = signal<ICountry[]>([]);
  get users$() {
    return this.userListSignal;
  };

  public get userSig(): Signal<IUser> {
    return this.userSignal;
  };

  getAllSignal(id: number | null):void {

    this.findAllExceptCurrent(id).subscribe({
      next: (response: any) => {
        this.userListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  };

  public getUserById(id: number): void {
    this.find(id)
      .subscribe({
        next: (response: any) => {
          this.userSignal.set(response);
        },
        error: (error: any) => {
          console.error('Error fetching user', error);
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
    return this.edit(user.id, user).pipe(
      tap((response: any) => {
        const updatedUsers = this.userListSignal().map(u => u.id === user.id ? response : u);
        this.userListSignal.set(updatedUsers);
      }),
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  };

  deleteUserSignal (user: IUser): Observable<any>{
    return this.logicDelete(user.id,user).pipe(
      tap((response: any) => {
        const deletedUsers = this.userListSignal().map(u => u.id === user.id ? response : u);
        console.log(deletedUsers);
        this.userListSignal.set(deletedUsers);
      }),
      catchError(error => {
        console.error('Error saving user', error);
        return throwError(error);
      })
    );
  }


}
