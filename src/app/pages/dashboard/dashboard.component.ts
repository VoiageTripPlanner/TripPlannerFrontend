import { Component } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
