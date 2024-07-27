import { Component, inject } from '@angular/core';
import { ActivitesCardComponent } from '../../components/activities/activites-card/activites-card.component';
import { MapComponent } from '../../components/map/map.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodCardComponent } from '../../components/food/food-card/food-card.component';


@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    FoodCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {

  // service = inject(YelpActivitiesService);

  // latitude: number = 37.786882;
  // longitude:number = -122.399972;
  // resultado: any;



  // enviarDatos() {
  //   const datos: IYelpApiSearchParams = {
  //     latitude: this.latitude,
  //     longitude: this.longitude,
  //   };



  //   this.service.getAllSignal(datos);
  // };

}
