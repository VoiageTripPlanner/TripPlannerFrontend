import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { ClasificationType, IBudgetPrices } from '../interfaces/budget.interface';

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

  
  updateSpending(amount: number, classification: ClasificationType) {
    const currentBudget = this.budgetSignal();
    switch (classification) {
      case 'flights':
        currentBudget.flightAmount = amount;
        break;
      case 'lodge':
        currentBudget.lodgeAmount = amount;
        break;
      case 'food':
        currentBudget.foodAmount = amount;
        break;
      case 'activities':
        currentBudget.activitiesAmount = amount;
        break;
      case 'other':
        currentBudget.otherAmount = amount;
        break;
    }

    currentBudget.total = (
      currentBudget.flightAmount +
      currentBudget.lodgeAmount +
      (currentBudget.foodAmount || 0) +
      (currentBudget.activitiesAmount || 0) +
      (currentBudget.otherAmount || 0)
    );

    this.setBudget(currentBudget);
  }


}
