import { Component, inject } from '@angular/core';
import { ActivitesCardComponent } from '../../components/activities/activites-card/activites-card.component';
import { MapComponent } from '../../components/map/map.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodCardComponent } from '../../components/food/food-card/food-card.component';
import { Router } from '@angular/router';
import { BudgetBarComponent } from '../../components/budget-bar/budget-bar.component';
import { MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    FoodCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    BudgetBarComponent,
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {

  constructor(
    private router: Router, 
  ){}

  navigateToDashboard() {
    this.router.navigateByUrl('app/dashboard')
  }

}
