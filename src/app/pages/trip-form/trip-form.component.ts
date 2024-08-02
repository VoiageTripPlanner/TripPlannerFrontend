import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ITripForm } from '../../interfaces/trip.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NotifyService } from '../../shared/notify/notify.service';
import { timeout, timer } from 'rxjs';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';


@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    CommonModule,
    PlaceAutocompleteComponent
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent {

  tripService=inject(TripService);
  notifyService=inject(NotifyService);
  tripFormNgModel :ITripForm 
  formGeneralInfoSubmitted = false;
  formFlightSubmitted = false;


  constructor(
    private router: Router, 
    private route:ActivatedRoute
  ){
    this.tripFormNgModel=this.tripService.onGetDefaultTripForm();    
  }
  

  setTripInfo(formGeneralInfo: any, formFlightInfo: any,event:Event){
    event.preventDefault();
    
    if (formGeneralInfo.valid && formFlightInfo.valid) {

      this.tripService.setInitialForm(this.tripFormNgModel);
      this.tripService.saveFormData(this.tripFormNgModel);

      

      
      this.notifyService.onSearchDisclaimer();

      // this.router.navigateByUrl('/lodge');
      this.router.navigateByUrl('/flight');

    } else{
      this.notifyService.onNoFormData();
    }

  };

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 3);
    return d !== null && d >= tomorrow;
  };



}
