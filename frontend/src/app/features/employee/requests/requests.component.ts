import { Component, signal } from '@angular/core';

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
import { ClientsService } from '@/shared/services/clients/clients.service';
@Component({
  selector: 'app-requests',
  standalone: true,
  providers: [RequestsService, ClientsService],
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
export class RequestsComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  userRequests = signal(this.requestsService.getRequest('Aberta'));

  constructor(
    private requestsService: RequestsService,
    private clientsService: ClientsService,
  ) {}

  handleFilter(filterSelected: FiltersResponse) {
    const type = typeof filterSelected === 'string' ? filterSelected : filterSelected.type;

    switch (type) {
      case 'todas':
        this.userRequests.set(this.requestsService.filterAll());
        break;
      case 'hoje':
        this.userRequests.set(this.requestsService.filterToday());
        break;
      case 'abertas':
        this.userRequests.set(this.requestsService.filterOpenRequests());
        break;
      case 'data':
        if (!filterSelected.data) return;

        this.userRequests.set(
          this.requestsService.filterByDate({
            startDate: filterSelected.data.startDate,
            endDate: filterSelected.data.endDate,
          }),
        );
    }
  }

  getClientName(userId: number) {
    const name = this.clientsService.getClientById(userId)?.name;
    const splittedName = name?.split(' ');
    return `${splittedName?.[0]} ${splittedName?.[1]}`;
  }
}
