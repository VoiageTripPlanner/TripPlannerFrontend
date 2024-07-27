import { Component, inject, OnInit } from '@angular/core';
import { ClasificationType, IBudgetPrices } from '../../interfaces/budget.interface';
import { BudgetService } from '../../services/budged.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-bar',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './budget-bar.component.html',
  styleUrl: './budget-bar.component.scss'
})
export class BudgetBarComponent implements OnInit {


  budgetService = inject(BudgetService);
  budgetQuantity: IBudgetPrices;

  
  amount = 100;
  amount2 = 50;
  amount3 = 70;
  clasification = 'lodge'

  constructor() {

    // this.budgetQuantity = this.budgetService.onGetDefaultBudget();
    this.budgetQuantity = this.budgetService.budget$();

  };

  ngOnInit() {
    this.budgetService.setBudget(this.budgetQuantity);
    // this.increaseSpending(this.amount,'lodge');
    this.increaseSpending(this.amount2,'food');
    this.increaseSpending(this.amount3,'activities');
  }

  increaseSpending(amount: number, clasification: ClasificationType) {


    switch (clasification) {
      case 'flights':
        this.budgetQuantity.flightAmount = amount;
        break;
      case 'lodge':
        this.budgetQuantity.lodgeAmount = amount;
        break;
      case 'food':
        this.budgetQuantity.foodAmount = amount;
        break;
      case 'activities':
        this.budgetQuantity.activitiesAmount = amount;
        break;
      case 'other':
        this.budgetQuantity.otherAmount =  amount;
        break;
    }

    this.budgetQuantity.total = (
                                  this.budgetQuantity.flightAmount
                                  +this.budgetQuantity.lodgeAmount
                                  +(this.budgetQuantity.foodAmount ? this.budgetQuantity.foodAmount : 0 )
                                  +(this.budgetQuantity.activitiesAmount ? this.budgetQuantity.activitiesAmount : 0 )
                                  +(this.budgetQuantity.otherAmount ? this.budgetQuantity.otherAmount : 0 )
                                );
    this.budgetService.setBudget(this.budgetQuantity);

  }


  getSpendingPercentage(spendingClasification: number | undefined): number {

    if (  ! spendingClasification) {
      return 0;
    }
    const totalBudget = this.budgetQuantity.total || 1;

    return (spendingClasification / totalBudget) * 100;
  }

}
