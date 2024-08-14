import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ChangeDetectionStrategy, inject, model, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CalendarEventComponent } from '../calendar-event/calendar-event.component';
import { CalendarEventService } from '../../services/calendar-event.service';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';


@Component({
  selector: 'app-calendar-planner',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CalendarEventComponent
  ],
  templateUrl: './calendar-planner.component.html',
  styleUrl: './calendar-planner.component.scss'
})


export class CalendarPlannerComponent implements OnInit {

  dialog = inject(MatDialog);
  calendarEventService = inject(CalendarEventService);

  weeks: { day: number, events: ICalendarEvent[] }[][] = [];
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();

  eventsStore :ICalendarEvent[] = [
    {
      eventId: 1,
      title               : 'Project Kickoff',
      description         : 'Project Desc',
      eventDate           : new Date('2024-08-03'),
      userId              : 2, 
      eventType           : 'Flight',
      operational         : true,

    },
    {
      eventId: 2,
      title               : 'Weekly Meeting',
      description         : 'Weekly Desc',
      eventDate           : new Date('2024-08-07'),
      userId              : 2, 
      eventType           : 'Activity',
      operational         : true,

    }
  ];


  calendarEvent:ICalendarEvent;
  allCalendarEvents:ICalendarEvent [];

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


  constructor() {
    this.calendarEvent        =this.calendarEventService.onGetDefaultCalendarEvent();
    this.allCalendarEvents    =this.calendarEventService.calendarEvent$();
  }

  ngOnInit(): void {
    this.generateCalendar(this.month, this.year);
  }



  generateCalendar(month: number, year: number) {
    this.weeks = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    let startDay = new Date(year, month, 1).getDay();
    startDay = (startDay === 0) ? 6 : startDay - 1;
  
    let week: { day: number, events: ICalendarEvent[] }[] = [];
    for (let i = 0; i < startDay; i++) {
      week.push({ day: 0, events: [] });
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      

      const events = this.eventsStore.filter(event => {
        const eventDateKey = event.eventDate.toISOString().split('T')[0];
        return eventDateKey === dateKey;
      });
  
      week.push({
        day,
        events: events || []
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

  openDialog(isEdit: boolean, event: ICalendarEvent | null): void {

    const dialogRef = this.dialog.open(CalendarEventComponent, {
      width: '40%',
      data: { calendarEvent: event, edit: isEdit },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.generateCalendar(this.month, this.year);
    });
  }


}
