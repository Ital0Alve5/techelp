import { Component } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';

import { ClientTableRowComponent } from '@/features/client-panel/components/client-table-row/client-table-row.component';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [CardComponent, ClientTableRowComponent],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.scss',
})
export class ClientPanelComponent {
  userRequests: {
    id: number;
    userId: number;
    date: string;
    deviceDescription: string;
    currentStatus: string;
  }[] = [];

  userId: number = JSON.parse(localStorage.getItem('userId')!);

  constructor() {
    maintenanceRequests.forEach((request) => {
      if (request.userId === this.userId) {
        this.userRequests.push({
          id: request.id,
          userId: request.userId,
          date: request.date,
          deviceDescription: request.deviceDescription,
          currentStatus: request.currentStatus,
        });
      }
    });
  }
}
