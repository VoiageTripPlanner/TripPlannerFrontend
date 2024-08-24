import { CommonModule } from "@angular/common";
import { Component, effect, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { ChangeDetectionStrategy, inject, model, signal } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { CalendarEventComponent } from "../calendar-event/calendar-event.component";
import { CalendarEventService } from "../../services/calendar-event.service";
import { ICalendarEvent } from "../../interfaces/calendar-event.interface";
import { AuthService } from "../../services/auth.service";
import { IUserId } from "../../interfaces/user.interface";

@Component({
  selector: "app-calendar-planner",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CalendarEventComponent,
  ],
  templateUrl: "./calendar-planner.component.html",
  styleUrl: "./calendar-planner.component.scss",
})
export class CalendarPlannerComponent implements OnInit {
  dialog = inject(MatDialog);
  calendarEventService = inject(CalendarEventService);
  userInformation = inject(AuthService);

  weeks: { day: number; events: ICalendarEvent[] }[][] = [];
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();

  userId: IUserId = { userId: 0 };
  showCalendar: boolean = false;

  calendarEvent: ICalendarEvent;
  allCalendarEvents: ICalendarEvent[] = [];

  monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor() {
    this.userId.userId = this.userInformation.getUserId();
    this.loadEvents();
    this.calendarEvent = this.calendarEventService.onGetDefaultCalendarEvent();
  }

  ngOnInit(): void {}

  loadEvents() {
    this.calendarEventService.getAllSignal(this.userId);
    effect(() => {
      this.allCalendarEvents = this.calendarEventService.calendarEvent$();

      if (this.allCalendarEvents.length > 0) {
        this.showCalendar = true;
        this.generateCalendar(this.month, this.year);
      }
    });
  }

  generateCalendar(month: number, year: number) {
    this.weeks = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let startDay = new Date(year, month, 1).getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    let week: { day: number; events: ICalendarEvent[] }[] = [];
    for (let i = 0; i < startDay; i++) {
      week.push({ day: 0, events: [] });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      const events = this.allCalendarEvents.filter((event) => {
        if (!event || !event.eventDate) {
          return false;
        }
        const eventDate = new Date(event.eventDate);
        const eventDateKey = eventDate.toISOString().split("T")[0];
        return eventDateKey === dateKey;
      });

      week.push({
        day,
        events: events || [],
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
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.generateCalendar(this.month, this.year);
  }

  openDialog(isEdit: boolean, event: ICalendarEvent | null): void {
    const dialogRef = this.dialog.open(CalendarEventComponent, {
      width: "40%",
      data: { calendarEvent: event, edit: isEdit },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.generateCalendar(this.month, this.year);
    });
  }
}
