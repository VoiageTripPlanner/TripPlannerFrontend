import { Component, effect, inject } from '@angular/core';
import { MapComponent } from '../../map/map.component';
import { GoogleHotelService } from '../../../services/api-request/google-hotel.service';
import { IGoogleResponse, ISearchParameters } from '../../../interfaces/google-hotel-response.interface';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../../shared/notify/notify.service';
import { TripService } from '../../../services/trip.service';
import { ITripForm } from '../../../interfaces/trip.interface';
import { formatDateToYYYYMMDD } from '../../../shared/utils/date-formatter';
import { MapsComponent } from '../../maps/maps.component';
import { BudgetService } from '../../../services/budged.service';
import { BudgetBarComponent } from '../../budget-bar/budget-bar.component';
import { Router } from '@angular/router';
import { IBudgetPrices } from '../../../interfaces/budget.interface';

@Component({
  selector: 'app-lodge-card',
  standalone: true,
  imports: [
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    MapsComponent

  ],
  templateUrl: './lodge-card.component.html',
  styleUrl: './lodge-card.component.scss'
})
export class LodgeCardComponent {

  service = inject(GoogleHotelService);
  budgetService=inject(BudgetService);
  notifyService = inject(NotifyService);
  tripFormService=inject(TripService);
  
  googleHotelResponseList: IGoogleResponse[] = []
  initialForm:ITripForm;
  tripBudget:IBudgetPrices;


  
  constructor(
    private router: Router,
  ) {

    this.initialForm = this.tripFormService.getFormData();
    this.tripBudget=this.budgetService.getBudgetData();

    this.sendData();

  };
  
  
  sendData() {

    const data: ISearchParameters = {
    
      q: this.initialForm.q,
      check_in_date: formatDateToYYYYMMDD(this.initialForm.check_in_date),
      check_out_date: formatDateToYYYYMMDD(this.initialForm.check_out_date)
    };
    
    this.service.getAllSignal(data);

    effect(() => {

      this.googleHotelResponseList = this.service.googleHotelResponse$();
    })
  };



  trackByIndex(index: number, googleHotelResponseList: IGoogleResponse): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  visitSite(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      this.notifyService.onNoData();
    }
  };

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../../../../assets/img/No_image_available.png';
  }


  selectOption(amount:number | undefined){


    if (!amount) {
      amount=0;
    }

    const classification = 'lodge'; 

    this.budgetService.updateSpending(amount, classification);

    this.router.navigateByUrl('/food');

    
  }



}


