import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {
  date = new Date();
  startDate = signal('');
  endDate = signal(`${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`);
  dateRangeSelected = output<{ startDate: string; endDate: string }>();

  onDateChange($event: { startDate: string } | { endDate: string }) {
    if ('startDate' in $event) {
      const [year, month, day] = $event.startDate.split('-');
      this.startDate.set(`${day}/${month}/${year}`);
    } else {
      const [year, month, day] = $event.endDate.split('-');
      this.endDate.set(`${day}/${month}/${year}`);
    }

    if (this.startDate() && this.endDate())
      this.dateRangeSelected.emit({ startDate: this.startDate(), endDate: this.endDate() });
  }
}
