import { Component, signal } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';

import { RequestsService } from './services/requests.service';
import { TableComponent } from '@/shared/ui/table/table.component';
import { Router } from '@angular/router';
import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';
import { WaitingIcon } from '@/shared/ui/icons/waiting.icon';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
import { ClientRequests } from './types/client-requests.type';

@Component({
  selector: 'app-client-requests-table',
  standalone: true,
  imports: [CardComponent, AllowVisibilityIcon, TableComponent, WaitingIcon],
  providers: [RequestsService],
  templateUrl: './requests-table.component.html',
  styleUrl: './requests-table.component.scss',
})
export class ClientRequestsTableComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requests = signal<ClientRequests[]>([]);

  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private popupService: PopupService,
  ) {
    this.getRequestsById();
  }

  async getRequestsById() {
    const success = await this.requestsService.getRequests();

    if (!success?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in success.data) {
      Object.values(success.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const maintenanceRequestsList = success.data.data?.['maintenanceRequestsList'] as unknown;

    if (
      Array.isArray(maintenanceRequestsList) &&
      maintenanceRequestsList.every((item) => typeof item === 'object' && 'clientId' in item)
    ) {
      this.requests.set(maintenanceRequestsList as ClientRequests[]);
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de solicitações de manutenção.',
      });
    }
  }

  onViewRequestDetails(requestId: number) {
    this.router.navigate([`/cliente/${this.userId}/solicitacao/${requestId}`]);
  }

  onCheckBudget(requestId: number) {
    this.router.navigate([`/cliente/${this.userId}/orcamento/${requestId}`]);
  }

  onRedeemRequest(requestId: number) {
    this.router.navigate([`/cliente/${this.userId}/resgate/${requestId}`]);
  }

  onPayService(requestId: number) {
    this.router.navigate([`/cliente/${this.userId}/orcamento/${requestId}`]);
  }
}
