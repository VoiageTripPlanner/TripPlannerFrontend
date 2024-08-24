import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITrip } from "../../interfaces/trip.interface";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-trips-table",
  standalone: true,
  imports: [DatePipe, CurrencyPipe, MatPaginatorModule],
  templateUrl: "./trips-table.component.html",
  styleUrl: "./trips-table.component.scss",
})
export class TripsTableComponent {
  @Input() public trips!: ITrip[] | null;
  @Input() public pageSize!: number;
  @Input() public totalElements!: number;
  @Output() public page: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() public view: EventEmitter<ITrip> = new EventEmitter<ITrip>();

  public viewTrip(trip: ITrip): void {
    this.view.emit(trip);
  }

  public changePage(event: PageEvent): void {
    this.page.emit(event);
  }
}
