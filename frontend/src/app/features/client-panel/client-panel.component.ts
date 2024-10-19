import { Component } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';

import { ClientTableRowComponent } from '@/features/client-panel/components/client-table-row/client-table-row.component';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { ClientRequests } from './types/client-requests.type';
@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [CardComponent, ClientTableRowComponent],
  providers: [RequestsService],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.scss',
})
export class ClientPanelComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requests: ClientRequests[] = this.requestsService.getRequestsByClientId(this.userId);

  constructor(private requestsService: RequestsService) {}
}
