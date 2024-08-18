import { Component } from '@angular/core';
import { CalendarPlannerComponent } from '../../components/calendar-planner/calendar-planner.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarPlannerComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
