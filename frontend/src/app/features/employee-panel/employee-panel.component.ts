import { Component } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';

import { EmployeeTableRowComponent } from '@/features/employee-panel/components/employee-table-row/employee-table-row.component';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { RequestStats } from '@/shared/types/request-status.type';

@Component({
  selector: 'app-employee-panel',
  standalone: true,
  imports: [CardComponent, EmployeeTableRowComponent],
  templateUrl: './employee-panel.component.html',
  styleUrl: './employee-panel.component.scss',
})
export class EmployeePanelComponent {
  userRequests: {
    id: number;
    userId: number;
    date: string;
    deviceDescription: string;
    currentStatus: string;
  }[] = [];

  userId: number = JSON.parse(localStorage.getItem('userId')!);
  filterStatus: RequestStats | undefined;

  constructor(private requestsService: RequestsService) {
    this.loadRequests();
  }

  loadRequests() {
    this.userRequests = this.requestsService
      .getRequest(this.filterStatus)
      .filter(
        (request) =>
          request.userId === this.userId &&
          (!this.filterStatus || request.currentStatus === this.filterStatus)
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  applyFilters(status: RequestStats) {
    this.filterStatus = status;
    this.loadRequests();
  }
}
