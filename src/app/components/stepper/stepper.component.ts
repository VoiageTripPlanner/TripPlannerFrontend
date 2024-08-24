import { Component } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FoodComponent } from "../../pages/food/food.component";
import { FlightsComponent } from "../../pages/flights/flights.component";
import { LodgeComponent } from "../../pages/lodge/lodge.component";
import { ActivitiesNearbyCardComponent } from "../activities-nearby-card/activities-nearby-card.component";
import { PlaceAutocompleteComponent } from "../place-autocomplete/place-autocomplete.component";
import { ActivitiesNearbyComponent } from "../../pages/activities-nearby/activities-nearby.component";

@Component({
  selector: "app-stepper",
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
    FoodComponent,
    ActivitiesNearbyComponent,
    PlaceAutocompleteComponent,
  ],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
