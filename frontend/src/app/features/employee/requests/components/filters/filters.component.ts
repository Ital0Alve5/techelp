import { Component, output } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { DateComponent } from '../date/date.component';
import { FiltersResponse } from './types/filters-response.type';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ButtonComponent, DateComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  filters = output<FiltersResponse>();

  filterToday() {
    this.filters.emit({
      type: 'hoje',
      data: null,
    });
  }

  filterAll() {
    this.filters.emit({
      type: 'todas',
      data: null,
    });
  }

  filterByDate($event: { startDate: string; endDate: string }) {
    this.filters.emit({
      type: 'data',
      data: $event,
    });
  }

  filterOpen() {
    this.filters.emit({
      type: 'abertas',
      data: null,
    });
  }
}
