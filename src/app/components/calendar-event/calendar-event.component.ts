import { Component, Inject, inject } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';
import { CalendarEventService } from '../../services/calendar-event.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaceAutocompleteComponent } from '../place-autocomplete/place-autocomplete.component';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifyService } from '../../shared/notify/notify.service';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    CommonModule,
    PlaceAutocompleteComponent
  ],
  templateUrl: './calendar-event.component.html',
  styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {

  dialogTitle: string = '';
  isEdit: boolean = false;

  calendarEventService = inject(CalendarEventService);
  notifyService = inject(NotifyService);

  eventNgmodel: ICalendarEvent;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<CalendarEventComponent>,
  ) {
    this.isEdit = data.edit;
    this.dialogTitle = this.isEdit ? 'Edit Event' : 'Add Event';

    this.eventNgmodel = this.isEdit ? data.calendarEvent : this.calendarEventService.onGetDefaultCalendarEvent();

    console.log(this.eventNgmodel)

  }


  saveCalendarEvent(form: NgForm) {

    if (form.valid) {
      if (this.isEdit) {
        this.calendarEventService.updateCalendarEvent(this.eventNgmodel);
      } else {
        this.calendarEventService.saveCalendarEvent(this.eventNgmodel);
      }
    } else {
      this.notifyService.onError();
    }

    this.onClose();
  }

  deleteCalendarEvent() {

    this.notifyService.onDeleteConfirmation().then((result) => {

      if (result.value) {

        this.calendarEventService.deleteCalendarEvent(this.eventNgmodel);
      }
    });
    this.onClose();
  };

  onClose = () => {
    this._dialogRef.close();
  };

}