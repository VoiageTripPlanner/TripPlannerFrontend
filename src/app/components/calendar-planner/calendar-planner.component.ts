import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendar-planner',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar-planner.component.html',
  styleUrl: './calendar-planner.component.scss'
})
export class CalendarPlannerComponent implements OnInit {

  daysInMonth: Date[] = [];

  ngOnInit() {
    this.daysInMonth = this.getDaysInMonth(new Date().getFullYear(), new Date().getMonth());
  }

  getDaysInMonth(year: number, month: number): Date[] {
    let date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

}
