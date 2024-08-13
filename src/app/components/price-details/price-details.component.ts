import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budged.service';
import { IBudgetPrices } from '../../interfaces/budget.interface';
import { Router } from '@angular/router';
import { NotifyService } from '../../shared/notify/notify.service';

@Component({
  selector: 'app-price-details',
  standalone: true,
  imports: [],
  templateUrl: './price-details.component.html',
  styleUrl: './price-details.component.scss'
})
export class PriceDetailsComponent {

  budgetService = inject(BudgetService);
  NotifyService = inject(NotifyService);
  tripBudget: IBudgetPrices;

  constructor(
    private router: Router,
  ) {
    this.tripBudget = this.budgetService.getBudgetData();
  }



}
