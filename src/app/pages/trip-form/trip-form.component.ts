import {ChangeDetectionStrategy, Component} from '@angular/core';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent {

}
