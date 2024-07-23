import { Component, inject } from '@angular/core';
import { ActivitesCardComponent } from '../../components/activities/activites-card/activites-card.component';
import { MapComponent } from '../../components/map/map.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YelpFoodService } from '../../services/api-request/yelp-food.service';
import { IYelpApiSearchParams } from '../../interfaces/yelp-food-response.interface';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    ActivitesCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

  // service = inject(YelpFoodService);

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
