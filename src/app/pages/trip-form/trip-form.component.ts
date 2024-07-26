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
    CommonModule
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
      // this.router.navigateByUrl('/lodge'),
      // this.router.navigate(['lodge'], { relativeTo: this.route });
      console.log(this.tripFormNgModel);
    } else{
      this.notifyService.onNoFormData();
    }


  };

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d !== null && d >= today;
  };



}
