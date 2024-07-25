import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ITripForm } from '../../interfaces/trip.interface';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


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
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent {

  tripService=inject(TripService);
  tripFormNgModel :ITripForm 

  constructor(
    private router: Router, 
  ){
    this.tripFormNgModel=this.tripService.onGetDefaultTripForm();    
  }
  

  setTripInfo(){
    console.log(this.tripFormNgModel)
  }


}
