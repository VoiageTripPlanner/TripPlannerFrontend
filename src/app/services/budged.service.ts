import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { IBudgetPrices } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetService extends BaseService<IBudgetPrices> {
  protected override source: string = 'budget';
  private budgetSignal = signal<IBudgetPrices>(this.onGetDefaultBudget());


  get budget$() {
    return this.budgetSignal;
  }

  onGetDefaultBudget (){

    const defaultValue:IBudgetPrices={
      lodgeAmount:        0,
      flightAmount:       0,
      foodAmount:         0,
      activitiesAmount:   0,
      otherAmount:        0,
      total:              0
    }

    return defaultValue;

  }

  setBudget(data:IBudgetPrices){
    this.budgetSignal.set(data);
  }


}
