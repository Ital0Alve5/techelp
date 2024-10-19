import { Component } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';

import { RequestsService } from '@/shared/services/requests/requests.service';
import { ClientRequests } from './types/client-requests.type';
import { TableComponent } from '@/shared/ui/table/table.component';
import { Router } from '@angular/router';
import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';
import { WaitingIcon } from '@/shared/ui/icons/waiting.icon';

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
  requests: ClientRequests[] = this.requestsService.getRequestsByClientId(this.userId);

  constructor(
    private requestsService: RequestsService,
    private router: Router,
  ) {}

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
