import { Component } from '@angular/core';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-lodge-card',
  standalone: true,
  imports: [
    MapComponent,
  ],
  templateUrl: './lodge-card.component.html',
  styleUrl: './lodge-card.component.scss'
})
export class LodgeCardComponent {

}
