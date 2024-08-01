import { Injectable } from '@angular/core';
import { ILoginResponse, IResponse } from '../interfaces/index.interface';
import { Observable, firstValueFrom, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken!: string;
  private expiresIn! : number;
  private userId!: number;
  private user: IUser = {email: '', authorities: []};

  constructor(private http: HttpClient) {
    this.load();
  }

  public save(): void {
    if (this.user) localStorage.setItem('auth_user', JSON.stringify(this.user));

    if (this.accessToken)
      localStorage.setItem('access_token', JSON.stringify(this.accessToken));

    if (this.expiresIn)
      localStorage.setItem('expiresIn',JSON.stringify(this.expiresIn));
    if (this.userId)
      localStorage.setItem('userId', JSON.stringify(this.userId));
  }

  private load(): void {
    let token = localStorage.getItem('access_token');
    if (token) this.accessToken = token;
    let exp = localStorage.getItem('expiresIn');
    if (exp) this.expiresIn = JSON.parse(exp);
    const user = localStorage.getItem('auth_user');
    if (user) this.user = JSON.parse(user);
    const userId = localStorage.getItem('userId');
    if (userId) this.userId = JSON.parse(userId);
  }

  public getUser(): any {
    return this.user;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public check(): boolean {
    if (!this.accessToken){
      return false;
    } else {
      return true;
    }
  }

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('auth/login', credentials).pipe(
      tap((response: any) => {
        this.accessToken = response.token;
        this.user.email = credentials.email;
        this.expiresIn = response.expiresIn;
        this.user = response.authUser;
        this.userId = response.authUser.user_id;
        this.save();
      })
    );
  }

  public hasRole(role: string): boolean {
    return this.user.authorities ?  this.user?.authorities.some(authority => authority.authority == role) : false;
  }

  public hasAnyRole(roles: any[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  public getPermittedRoutes(routes: any[]): any[] {
    let permittedRoutes: any[] = [];
    for (const route of routes) {
      if(route.data && route.data.authorities) {
        if (this.hasAnyRole(route.data.authorities)) {
          permittedRoutes.unshift(route);
        } 
      }
    }
    return permittedRoutes;
  }

  public signup(user: IUser): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('auth/signup', user);
  }

  public logout() {
    this.accessToken = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('userId');
  }

  public resetPassword(user: IUser): Observable<IUser> {
    return this.http.post('auth/reset-password', user);
  }

  public validateOtp(user: IUser): Observable<IUser> {
    return this.http.post('auth/validate-otp', user);
  }
}
