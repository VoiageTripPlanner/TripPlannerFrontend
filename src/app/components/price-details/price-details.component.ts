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

  onSaveTrip() {

    this.NotifyService.onCustomConfirmation('Do you want to save this info ?', 'The trip info will be stored', 'Yes, sure!').then((result) => {
      if (result.isConfirmed) {
    
        console.log('Save Trip'); //aca hay que implementar el service para enviar la info al backend 
    
        this.removeLocalStorage()
        this.router.navigateByUrl('/app/dashboard')
      };
    });
    
  }

  onStartAgain() {

    this.NotifyService.onCustomConfirmation('Are you sure?', 'You will lose all the data', 'Yes, Start Again').then((result) => {
      if (result.isConfirmed) {
        this.removeLocalStorage()
      };

    });
  };


  private removeLocalStorage() {

    localStorage.removeItem('tripFormData');
    localStorage.removeItem('budget');
    localStorage.removeItem('flight');
    localStorage.removeItem('lodge');
    localStorage.removeItem('food');
    // localStorage.removeItem('activities');      //Para cuando se implemente activities 

    this.router.navigateByUrl('/app/trip-form');
  }

}
