import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';

import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { TableComponent } from '@/shared/ui/table/table.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { RequestsService } from './services/requests.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';

import { FiltersComponent } from '@/features/employee/requests/components/filters/filters.component';

import { FiltersResponse } from './components/filters/types/filters-response.type';
import { ClientRequests } from './types/client-requests.type';
@Component({
  selector: 'app-requests',
  standalone: true,
  providers: [RequestsService],
  imports: [FiltersComponent, ModalComponent, TableComponent, AllowVisibilityIcon],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {
  requests = signal<ClientRequests[]>([]);
  hideModal = signal(true);
  requestId = signal<number>(-1);

  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private popupService: PopupService,
  ) {}

  async getAllOpenRequests() {
    const response = await this.requestsService.getAllOpenRequests();

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const maintenanceRequestsList = response.data.data?.['maintenanceRequestsList'] as unknown;

    if (Array.isArray(maintenanceRequestsList)) {
      this.requests.set(maintenanceRequestsList as ClientRequests[]);
      this.requestsService.sortRequestsByDateAndHour(maintenanceRequestsList);
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de solicitações de manutenção.',
      });
    }
  }

  async getAllRequests() {
    const response = await this.requestsService.getAllRequests();

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const maintenanceRequestsList = response.data.data?.['maintenanceRequestsList'] as unknown;

    if (Array.isArray(maintenanceRequestsList)) {
      this.requests.set(maintenanceRequestsList as ClientRequests[]);
      this.requestsService.sortRequestsByDateAndHour(maintenanceRequestsList);
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de solicitações de manutenção.',
      });
    }
  }

  async getTodayOpenRequests() {
    const response = await this.requestsService.getTodayOpenRequests();

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const maintenanceRequestsList = response.data.data?.['maintenanceRequestsList'] as unknown;

    if (Array.isArray(maintenanceRequestsList)) {
      this.requests.set(maintenanceRequestsList as ClientRequests[]);
      this.requestsService.sortRequestsByDateAndHour(maintenanceRequestsList);
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de solicitações de manutenção.',
      });
    }
  }

  async getOpenRequestsByDateRange(startDate: string, endDate: string) {
    if (!startDate) startDate = '2024-01-01';
    else if (!endDate) endDate = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    const response = await this.requestsService.getOpenRequestsByDateRange(startDate, endDate);

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const maintenanceRequestsList = response.data.data?.['maintenanceRequestsList'] as unknown;

    if (Array.isArray(maintenanceRequestsList)) {
      this.requests.set(maintenanceRequestsList as ClientRequests[]);
      this.requestsService.sortRequestsByDateAndHour(maintenanceRequestsList);
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de solicitações de manutenção.',
      });
    }
  }

  handleFilter(filterSelected: FiltersResponse) {
    const type = typeof filterSelected === 'string' ? filterSelected : filterSelected.type;

    switch (type) {
      case 'todas':
        this.getAllRequests();
        break;
      case 'hoje':
        this.getTodayOpenRequests();
        break;
      case 'abertas':
        this.getAllOpenRequests();
        break;
      case 'data':
        if (!filterSelected.data) return;
        this.getOpenRequestsByDateRange(filterSelected.data.startDate, filterSelected.data.endDate);
    }
  }

  onOpenFinishModal(requestId: number) {
    this.requestId.set(requestId);
    this.hideModal.set(false);
  }

  onCloseFinishModal() {
    this.requestId.set(-1);
    this.hideModal.set(true);
  }

  async onFinishRequest() {
    if (this.requestId() <= -1) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Solicitação não encontrada! Tente novamente',
      });

      return;
    }

    const response = await this.requestsService.finishRequest(this.requestId());

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    await this.getAllRequests();

    this.hideModal.set(true);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Solicitação finalizada!',
    });
  }

  onViewRequest(requestId: number) {
    this.router.navigate([`/funcionario/solicitacao/${requestId}`]);
  }
  onMakeBudget(requestId: number) {
    this.router.navigate([`/funcionario/orcamento/${requestId}`]);
  }
  onMakeMaintenance(requestId: number) {
    this.router.navigate([`/funcionario/manutencao/${requestId}`]);
  }
}
