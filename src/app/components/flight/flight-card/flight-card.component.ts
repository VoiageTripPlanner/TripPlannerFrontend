import { Component, effect, inject } from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleFlightsService } from '../../../services/api-request/google-flights.service';
import { OtherFlight, SearchParameters } from '../../../interfaces/google-flights-response.interface';
import { MapComponent } from '../../map/map.component';
import { NotifyService } from '../../../shared/notify/notify.service';
import { ITripForm } from '../../../interfaces/trip.interface';
import { IBudgetPrices } from '../../../interfaces/budget.interface';
import { BudgetService } from '../../../services/budged.service';
import { TripService } from '../../../services/trip.service';
import { Router } from '@angular/router';
import { formatDateToYYYYMMDD } from '../../../shared/utils/date-formatter';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    LoaderComponent,
    ModalComponent,
    CommonModule,
    MapComponent,
    FormsModule
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {

  // type: string = '1';
  // departure_id: string = 'PEK';
  // arrival_id: string = 'AUS';
  // outbound_date: String = "2024-07-30";
  // return_date?: String = "2024-08-06";
  // travel_class: number = 1;
  // stops: number = 0;

  budgetService = inject(BudgetService);
  notifyService = inject(NotifyService);
  service = inject(GoogleFlightsService);
  tripFormService = inject(TripService);

  initialForm: ITripForm;
  tripBudget: IBudgetPrices;
  isLoading: boolean = false;

  googleFlightsResponseList: OtherFlight[] = [];
  constructor(
    private router: Router,
  ) {

    debugger
    this.initialForm = this.tripFormService.getFormData();
    this.tripBudget = this.budgetService.getBudgetData();

    this.sendData();
  };

  sendData() {
    this.isLoading = true;
  
    debugger;
    const datos: SearchParameters = {
      departure_id: this.initialForm.departure_id,
      arrival_id: this.initialForm.arrival_id,
      outbound_date: formatDateToYYYYMMDD(this.initialForm.outbound_date),
      return_date: formatDateToYYYYMMDD(this.initialForm.return_date ? this.initialForm.return_date : new Date()),
      type: this.initialForm.type.toString(),
      travel_class: this.initialForm.travel_class ?? 1,
      stops: this.initialForm.stops ?? 0
    };
  
    // Validar 'type'
    if (datos.type !== '1' && datos.type !== '2') {
      console.log('Invalid type value');
      return;
    }
  
    this.service.getAllSignal(datos);
  
    effect(() => {
     
      this.googleFlightsResponseList = this.service.googleFlightsResponse$();
      if (this.googleFlightsResponseList.length > 0) {
        this.isLoading=false;
      }else if(this.googleFlightsResponseList.length = 0 ){
        this.isLoading=false;
        this.notifyService.onError();
      }
    });
  }
  

  trackByIndex(index: number, googleFlightsResponseList: OtherFlight): number {
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


  openLayouts(): void {
    // if (url) {
    //   window.open(url,'_blank') ;
    // } else {
    //   this.notifyService.onNoData();
    // }
    console.log('implement layouts')
  };

  selectOption(amount:number | undefined){


    if (!amount) {
      amount=0;
    }

    const classification = 'flights'; 

    this.budgetService.updateSpending(amount, classification);

    this.router.navigateByUrl('/lodge');

    
  }

}
