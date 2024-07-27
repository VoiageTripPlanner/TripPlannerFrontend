import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/index.interface';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);

  public find(id: string | number): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.source + '/' + id);
  }

  public findAll(s: string = ''): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source, { params: { s } });
  }

  public bringInfoWithParams(params: { [key: string]: any } = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source, { params });
  }

  public add(data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.source, data);
  }

  public edit(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.source + '/' + id, data);
  }


  public findAllDetailed(s: string = ''): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source + '/userDetailed', { params: { s } });
  }

  public logicDelete(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.source + '/delete/' + id, data);
  }

  public del(id: any): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.source + '/' + id);
  }


  
}
