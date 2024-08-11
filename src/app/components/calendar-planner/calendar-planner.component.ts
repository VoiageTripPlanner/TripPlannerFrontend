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


  weeks: number[][]     = [];
  month: number         = new Date().getMonth();
  year: number          = new Date().getFullYear();

  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];


  ngOnInit(): void {
    this.generateCalendar(this.month, this.year);
  }


  generateCalendar(month: number, year: number) {
    this.weeks              = []; 
    const daysInMonth       = new Date(year, month + 1, 0).getDate();
    let startDay            = new Date(year, month, 1).getDay();
    startDay                = (startDay === 0) ? 6 : startDay - 1; 
    const totalDays         = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    let week: number[]      = [];

    for (let i = 0; i < startDay; i++) {
      week.push(0);  
    }

    totalDays.forEach(day => {
      week.push(day);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    });

    if (week.length) {
      while (week.length < 7) {
        week.push(0); 
      }
      this.weeks.push(week);
    }
}


  previousMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.generateCalendar(this.month, this.year);
  };


  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.generateCalendar(this.month, this.year);
  };


}
