import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {
  startDate: string | null = null;
  endDate: string | null = null;

  @Output() dateRangeSelected = new EventEmitter<{ startDate: string | null; endDate: string | null }>();

  onDateChange() {
    this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}
