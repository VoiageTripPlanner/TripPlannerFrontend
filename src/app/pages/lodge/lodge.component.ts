import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { GoogleHotelsResponseService } from '../../services/google-hotels-response.service';
import { ISearchParameters } from '../../interfaces/lodge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IResponse } from '../../interfaces';

@Component({
  selector: 'app-lodge',
  standalone: true,
  imports: [
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './lodge.component.html',
  styleUrl: './lodge.component.scss'
})
export class LodgeComponent {

  service = inject(GoogleHotelsResponseService);

  destino: string = '';
  checkIn: Date = new Date();
  checkOut: Date = new Date();
  resultado: any;

  enviarDatos() {
    const datos:ISearchParameters = {
      q: this.destino,
      check_in_date: this.checkIn,
      check_out_date: this.checkOut
    };

    this.service.getAllHotelsSignal(datos);
  };


  // enviarDatos() {
  //   const datos: ISearchParameters = {
  //     q: this.destino,
  //     check_in_date: this.checkIn,
  //     check_out_date: this.checkOut
  //   };
  
  //   this.service.getAllHotelsSignal(datos).subscribe(
  //     (response: IResponse<any[]>) => {
  //       console.log('Respuesta del servicio:', response);
  //       this.resultado = response;
  //     },
  //     error => {
  //       console.error('Error al enviar los datos', error);
  //     }
  //   );
  // }
}



