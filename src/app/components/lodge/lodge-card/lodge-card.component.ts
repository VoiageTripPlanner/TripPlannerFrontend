import { Component, effect, inject } from '@angular/core';
import { MapComponent } from '../../map/map.component';
import { GoogleHotelService } from '../../../services/api-request/google-hotel.service';
import { IGoogleResponse, ISearchParameters } from '../../../interfaces/google-hotel-response.interface';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lodge-card',
  standalone: true,
  imports: [
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule

  ],
  templateUrl: './lodge-card.component.html',
  styleUrl: './lodge-card.component.scss'
})
export class LodgeCardComponent {

  service = inject(GoogleHotelService);
  googleHotelResponseList: IGoogleResponse[] = []


  //Mas adelante estos datos van a venir del componente padre que va a ser el primer formulario
  destino: string = 'Istanbul';
  checkIn: String = "2024-08-07";
  checkOut: String = "2024-08-14";
  resultado: any;

  constructor() {
    this.sendData();
  };

  sendData() {

    const datos: ISearchParameters = {
      q: this.destino,
      check_in_date: this.checkIn,
      check_out_date: this.checkOut
    };

    this.service.getAllSignal(datos);

    effect(() => {
      
      this.googleHotelResponseList = this.service.googleHotelResponse$();
      console.log(this.googleHotelResponseList);
    })
  };



  trackByIndex(index: number, googleHotelResponseList: IGoogleResponse): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

}


