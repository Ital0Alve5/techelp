import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {
  currentDate = input.required();
  startDate = input('');
  endDate = input.required();

  startDateFiltered = output<string>();
  endDateFiltered = output<string>();

  onStartDateFiltered($event: string) {
    this.startDateFiltered.emit($event);
  }

  onEndDateFiltered($event: string) {
    this.endDateFiltered.emit($event);
  }
}
