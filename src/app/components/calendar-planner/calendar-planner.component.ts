import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface CalendarEvent {
  time: string;
  title: string;
  description?: string;
}


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


  // weeks: number[][]     = [];
  weeks: { day: number, events: CalendarEvent[] }[][] = [];
  month: number         = new Date().getMonth();
  year: number          = new Date().getFullYear();

  events: { [key: string]: CalendarEvent[] } = {
    '2024-08-03': [{ time: '08:00 AM', title: 'Project Kickoff' }],
    '2024-08-07': [{ time: '02:00 PM', title: 'Weekly Meeting' }],
    '2024-08-10': [{ time: '08:00 AM', title: 'Project Kickoff' }],
    '2024-08-11': [{ time: '11:00 AM', title: 'Happy Hour' }, { time: '01:00 PM', title: 'One-on-One' }],
    '2024-08-14': [{ time: '09:00 PM', title: 'Creative Workshop' }],
  };

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
    this.weeks            = []; 
    const daysInMonth     = new Date(year, month + 1, 0).getDate();

    let startDay          = new Date(year, month, 1).getDay();
    startDay              = (startDay === 0) ? 6 : startDay - 1; 
    
    let week: { day: number, events: CalendarEvent[] }[] = [];
    for (let i = 0; i < startDay; i++) {
      week.push({ day: 0, events: [] });  
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      week.push({
        day,
        events: this.events[dateKey] || []
      });

      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) {
        week.push({ day: 0, events: [] });  
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
