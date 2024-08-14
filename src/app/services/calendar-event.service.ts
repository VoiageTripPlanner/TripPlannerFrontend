import { Injectable, Signal, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, forkJoin, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { ICalendarEvent } from '../interfaces/calendar-event.interface';

@Injectable({
    providedIn: 'root',
})
export class CalendarEventService extends BaseService<ICalendarEvent> {

    protected override source: string = 'calendarEvent';

    private calendarEventSignal = signal<ICalendarEvent[]>([]);


    get calendarEvent$() {
        return this.calendarEventSignal;
    };


    onGetDefaultCalendarEvent() {

        const defaultValue: ICalendarEvent = {
            eventId         : 0,
            title           : '',
            description     : '',
            eventDate       : new Date(),
            userId          : 0,
            eventType       : 'Other',
            operational     : false
        }

        return defaultValue;
    };


    getAllSignal() {

        this.findAll().subscribe({
            next: (response: any) => {
                this.calendarEventSignal.set(response);
                response.reverse();
            },
            error: (error: any) => {
                console.error('Error fetching users', error);
            }
        });
    };

    public getCalendarEventById(id: number): void {
        this.find(id)
            .subscribe({
                next: (response: any) => {
                    this.calendarEventSignal.set(response);
                },
                error: (error: any) => {
                    console.error('Error fetching user', error);
                }
            });
    };



    saveCalendarEvent(event: ICalendarEvent): Observable<any> {
        debugger
        return this.add(event).pipe(
            tap((response: any) => {
                this.calendarEventSignal.update(event => [response, ...event]);
            }),
            catchError(error => {
                console.error('Error saving user', error);
                return throwError(error);
            })
        );
    };
    
    updateCalendarEvent(event: ICalendarEvent): Observable<any> {
        debugger
        return this.edit(event.eventId, event).pipe(
            tap((response: any) => {
                const updatedUsers = this.calendarEventSignal().map(u => u.eventId === event.eventId ? response : u);
                this.calendarEventSignal.set(updatedUsers);
            }),
            catchError(error => {
                console.error('Error saving user', error);
                return throwError(error);
            })
        );
    };
    
    deleteCalendarEvent(event: ICalendarEvent): Observable<any> {
        debugger
        return this.logicDelete(event.eventId, event).pipe(
            tap((response: any) => {
                const deletedUsers = this.calendarEventSignal().map(u => u.eventId === event.eventId ? response : u);
                this.calendarEventSignal.set(deletedUsers);
            }),
            catchError(error => {
                console.error('Error saving user', error);
                return throwError(error);
            })
        );
    }


}
