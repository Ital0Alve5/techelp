import { Component, OnInit, output, signal } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { DateComponent } from '../date/date.component';
import { FiltersResponse } from './types/filters-response.type';
import { FilterTypes } from './types/filter-types.type';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ButtonComponent, DateComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  queryString = location.search;
  urlParams = new URLSearchParams(this.queryString);
  date = new Date();
  currentDate = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;

  filterType = signal(this.urlParams.get('filter'));
  startDate = signal(this.urlParams.get('startDate'));
  endDate = signal(this.urlParams.get('endDate') || this.currentDate);

  onFilter = output<FiltersResponse>();

  ngOnInit() {
    if (
      !this.filterType() ||
      !this.isFilterTypes(this.filterType()!) ||
      (this.filterType() === 'data' && (!this.startDate() || !this.endDate()))
    ) {
      this.filterOpen();
    } else if (this.filterType() === 'data') this.filterByDate();
    else if (this.filterType() === 'hoje') this.filterToday();
    else if (this.filterType() === 'todas') this.filterAll();
    else this.filterOpen();
  }

  isFilterTypes(value: string): value is FilterTypes {
    return ['hoje', 'todas', 'data', 'abertas'].includes(value as FilterTypes);
  }

  formmatDate(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  setStartDate(startDate: string) {
    this.startDate.set(startDate);
    this.filterByDate();
  }

  setEndDate(endDate: string) {
    this.endDate.set(endDate);
    this.filterByDate();
  }

  filterToday() {
    const response: FiltersResponse = {
      type: 'hoje',
      data: null,
    };

    this.onFilter.emit(response);
    this.setQueryParams(response);
    this.clearDateFilter();
  }

  filterAll() {
    const response: FiltersResponse = {
      type: 'todas',
      data: null,
    };

    this.onFilter.emit(response);
    this.setQueryParams(response);
    this.clearDateFilter();
  }

  filterOpen() {
    const response: FiltersResponse = {
      type: 'abertas',
      data: null,
    };

    this.onFilter.emit(response);
    this.setQueryParams(response);
    this.clearDateFilter();
  }

  filterByDate() {
    if (!this.startDate() && !this.endDate()) return;

    const unformmatedDates = { startDate: this.startDate()!, endDate: this.endDate()! };

    const response: FiltersResponse = {
      type: 'data',
      data: { startDate: this.formmatDate(this.startDate()!), endDate: this.formmatDate(this.endDate()!) },
    };

    this.onFilter.emit(response);

    response.data = unformmatedDates;
    this.setQueryParams(response);
  }

  setQueryParams(filterResponse: FiltersResponse) {
    const currentUrl = new URL(window.location.href.split('?')[0]);
    currentUrl.searchParams.set('filter', filterResponse.type);

    if (filterResponse.data) {
      currentUrl.searchParams.set('startDate', filterResponse.data.startDate);
      currentUrl.searchParams.set('endDate', filterResponse.data.endDate);
    }

    window.history.pushState({}, document.title, currentUrl);
  }

  clearDateFilter() {
    this.startDate.set('');
    this.endDate.set(this.currentDate);
  }
}
