import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ISearchParameters } from '../../interfaces/google-hotel-response.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleHotelService } from '../../services/api-request/google-hotel.service';
import { LodgeCardComponent } from '../../components/lodge/lodge-card/lodge-card.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-lodge',
  standalone: true,
  imports: [
    LodgeCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './lodge.component.html',
  styleUrl: './lodge.component.scss'
})
export class LodgeComponent {


}



