import { Component, output, signal, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent implements AfterViewInit {
  date = new Date();
  startDate = signal('');
  endDate = signal(`${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`);
  dateRangeSelected = output<{ startDate: string; endDate: string }>();

  startDateMax = signal('');

  ngAfterViewInit() {
    this.startDateMax.set(this.formatDate(this.endDate()));
  }

  formatDate(date: string): string {
    const splittedDate = date.split('/');
    return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
  }

  onDateChange($event: { startDate: string } | { endDate: string }) {
    if ('startDate' in $event) {
      const [year, month, day] = $event.startDate.split('-');
      this.startDate.set(`${day}/${month}/${year}`);
    } else {
      const [year, month, day] = $event.endDate.split('-');
      this.endDate.set(`${day}/${month}/${year}`);
      this.startDateMax.set(this.formatDate(this.endDate()));
    }

    if (this.startDate() && this.endDate())
      this.dateRangeSelected.emit({ startDate: this.startDate(), endDate: this.endDate() });
  }
}
