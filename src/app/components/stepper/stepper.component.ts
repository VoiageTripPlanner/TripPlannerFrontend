import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FoodComponent } from '../../pages/food/food.component';
import { FlightsComponent } from '../../pages/flights/flights.component';
import { LodgeComponent } from '../../pages/lodge/lodge.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlightsComponent,
    LodgeComponent,
    FoodComponent
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
//TODO: Ver el tama de si vamos a por ejemplo decidir la comida basado en las coordenadas del hotel o de donde se vana sacar esas coordenadas, en ese caso debemos bloquear el stepper hasta que se tengan las coordenadas

  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
