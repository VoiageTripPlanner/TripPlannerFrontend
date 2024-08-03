import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { NotifyService } from '../shared/notify/notify.service';
import { IVoiageLodge } from '../interfaces/lodge.interface';


@Injectable({
  providedIn: 'root',
})
export class LodgeService extends BaseService<IVoiageLodge>   {

  notifyService=inject(NotifyService);

  private lodgeListSignal = signal<IVoiageLodge>(this.onGetDefaultVoiageLodge());

  private storageKey = 'lodge';

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


  saveVoiageLodgeData(formData: IVoiageLodge): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formData));
  }

  getLodgeData(): IVoiageLodge {
    const formDataString = localStorage.getItem(this.storageKey);
    if (formDataString) {
      const formData = JSON.parse(formDataString);

      return formData;
    } else {
      return this.onGetDefaultVoiageLodge();
    }
  }
}