import { Component } from '@angular/core';
import { PlaceAutocompleteComponent } from '../place-autocomplete/place-autocomplete.component';
import { MapComponent } from '../map/map.component';
import { LoaderComponent } from '../loader/loader.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [
    PlaceAutocompleteComponent,    
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent {

}
