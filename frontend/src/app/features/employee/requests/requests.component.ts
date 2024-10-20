import { Component, OnInit, signal } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { TableComponent } from '@/shared/ui/table/table.component';

import { RequestsService } from '@/shared/services/requests/requests.service';

import { FiltersComponent } from '@/features/employee/requests/components/filters/filters.component';

import { WaitingIcon } from '@/shared/ui/icons/waiting.icon';
import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';

import { EmployeeTableRowComponent } from './components/client-table-row/employee-table-row.component';
import { FiltersResponse } from './components/filters/types/filters-response.type';
import { FilterTypes } from './components/filters/types/filter-types.type';
@Component({
  selector: 'app-requests',
  standalone: true,
  providers: [RequestsService],
  imports: [
    EmployeeTableRowComponent,
    ButtonComponent,
    LinkAsButtonComponent,
    FiltersComponent,
    ModalComponent,
    TableComponent,
    WaitingIcon,
    AllowVisibilityIcon,
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  userRequests = signal(this.requestsService.getRequest('Aberta'));

  constructor(private requestsService: RequestsService) {}

  ngOnInit() {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const initialFilterType = urlParams.get('filtro');
    const initialStartDate = urlParams.get('startDate')?.replaceAll('-', '/');
    const initialEndDate = urlParams.get('endDate')?.replaceAll('-', '/');

    if (
      !initialFilterType ||
      !this.isFilterTypes(initialFilterType) ||
      (initialFilterType === 'data' && (!initialStartDate || !initialEndDate))
    ) {
      this.handleFilter('abertas');
    } else if (initialFilterType === 'data') {
      this.handleFilter(initialFilterType, { startDate: initialStartDate!, endDate: initialEndDate! });
    } else this.handleFilter(initialFilterType);
  }

  isFilterTypes(value: string): value is FilterTypes {
    return ['hoje', 'todas', 'data', 'abertas'].includes(value as FilterTypes);
  }

  handleFilter(filterSelected: FiltersResponse | FilterTypes, dates?: { startDate: string; endDate: string }) {
    const type = typeof filterSelected === 'string' ? filterSelected : filterSelected.type;

    switch (type) {
      case 'todas':
        this.filterAllRequests();
        break;
      case 'hoje':
        this.filterRequestsCreatedToday();
        break;
      case 'abertas':
        this.filterOpenRequests();
        break;
      case 'data':
        if (typeof filterSelected === 'string' && dates) {
          this.filterRequestsByDateInterval(dates);
        } else if ('data' in (filterSelected as FiltersResponse)) {
          this.filterRequestsByDateInterval((filterSelected as FiltersResponse).data!);
        }
    }
  }

  filterAllRequests() {
    const currentUrl = new URL(window.location.href.split('?')[0]);
    currentUrl.searchParams.set('filtro', 'todas');

    this.userRequests.set(this.requestsService.filterAll());

    window.history.pushState({}, document.title, currentUrl);
  }

  filterRequestsCreatedToday() {
    const currentUrl = new URL(window.location.href.split('?')[0]);
    currentUrl.searchParams.set('filtro', 'hoje');

    this.userRequests.set(this.requestsService.filterToday());

    window.history.pushState({}, document.title, currentUrl);
  }

  filterRequestsByDateInterval(dates: { startDate: string; endDate: string }) {
    const currentUrl = new URL(window.location.href.split('?')[0]);
    currentUrl.searchParams.set('filtro', 'date');
    currentUrl.searchParams.set('startDate', dates.startDate.replaceAll('/', '-'));
    currentUrl.searchParams.set('endDate', dates.endDate.replaceAll('/', '-'));

    this.userRequests.set(this.requestsService.filterByDate(dates));

    window.history.pushState({}, document.title, currentUrl);
  }

  filterOpenRequests() {
    const currentUrl = new URL(window.location.href.split('?')[0]);
    currentUrl.searchParams.set('filtro', 'abertas');

    this.userRequests.set(this.requestsService.filterOpenRequests());

    window.history.pushState({}, document.title, currentUrl);
  }
}
