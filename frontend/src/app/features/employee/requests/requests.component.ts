import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { WaitingIcon } from '@/shared/ui/icons/waiting.icon';
import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { TableComponent } from '@/shared/ui/table/table.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { RequestsService } from '@/shared/services/requests/requests.service';
import { ClientsService } from '@/shared/services/clients/clients.service';
import { EmployeeService } from '@/shared/services/employees/employee.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';

import { FiltersComponent } from '@/features/employee/requests/components/filters/filters.component';

import { FiltersResponse } from './components/filters/types/filters-response.type';
@Component({
  selector: 'app-requests',
  standalone: true,
  providers: [RequestsService, ClientsService, EmployeeService],
  imports: [
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
  hideModal = signal(true);
  requestId = signal<number>(-1);

  constructor(
    private requestsService: RequestsService,
    private clientsService: ClientsService,
    private employeeService: EmployeeService,
    private router: Router,
    private popupService: PopupService,
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

  onOpenModal(requestId: number) {
    this.requestId.set(requestId);
    this.hideModal.set(false);
  }

  onCloseModal() {
    this.requestId.set(-1);
    this.hideModal.set(true);
  }

  onFinishRequest() {
    const employeeName = this.employeeService.getEmployeeById(this.userId);

    if (this.requestId() <= -1) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Solicitação não encontrada! Tente novamente',
      });

      return;
    }

    this.requestsService.updateStatus(this.requestId(), employeeName.name, 'Finalizada');

    this.hideModal.set(true);

    this.router.navigate([`/funcionario/${this.userId}/orcamento/${this.requestId()}`]);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Solicitação finalizada!',
    });
  }

  onViewRequest(requestId: number) {
    this.router.navigate([`/funcionario/${this.userId}/solicitacao/${requestId}`]);
  }
  onMakeBudget(requestId: number) {
    this.router.navigate([`/funcionario/${this.userId}/orcamento/${requestId}`]);
  }
  onMakeMaintenance(requestId: number) {
    this.router.navigate([`/funcionario/${this.userId}/manutencao/${requestId}`]);
  }
}
