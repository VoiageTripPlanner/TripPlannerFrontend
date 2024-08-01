import { inject, Injectable, signal } from '@angular/core';
import { OtherFlight, SearchParameters } from '../interfaces/google-flights-response.interface';
import { BaseService } from './base-service';
import { NotifyService } from '../shared/notify/notify.service';
import { IVoiageLodge } from '../interfaces/lodge.interface';


@Injectable({
  providedIn: 'root',
})
export class LodgeService extends BaseService<IVoiageLodge>   {

  notifyService=inject(NotifyService);

  private lodgeListSignal = signal<IVoiageLodge>(this.onGetDefaultVoiageLodge());

  get lodge$() {
    return this.lodgeListSignal;
  };


  onGetDefaultVoiageLodge(){

    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const defaultValue: IVoiageLodge = {
      lodge_id                      : 0,
      lodge_name                    : '',
      description                   : '',
      check_in                      : getNextDay(),
      check_out                     : getNextDay(),
      night_price                   : 0,
      latitude                      : 0,
      longitude                     : 0,
      totalRate                     : 0,
      type                          : '',
      operational                   : false,
      total_price                   : 0,
      creation_datetime             : new Date(),
      creation_responsible          : 0
    }

    return defaultValue;

  }

  getAllLodgeSignal() {

    this.findAll().subscribe({
      next: (response: any) => {
        this.lodgeListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
        this.notifyService.onError();
      }
    });
  };
}