import { Component } from '@angular/core';
import { MapsComponent } from "../../components/maps/maps.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
