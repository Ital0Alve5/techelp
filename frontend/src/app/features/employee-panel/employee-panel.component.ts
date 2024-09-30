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
      .filter((request) => {
        if (request.currentStatus === 'Redirecionada') {
          return this.isRequestRedirectionForCurrentUser(request);
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = this.parseBrazilianDate(a.date);
        const dateB = this.parseBrazilianDate(b.date);
  
        if (!dateA || !dateB) {
          return 0;
        }
  
        return dateA.getTime() - dateB.getTime();
      });
  }
  
  parseBrazilianDate(dateString: string): Date | null {
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) {
      return null;
    }
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  
  

  isRequestRedirectionForCurrentUser(request: { userId: number }): boolean {
    return request.userId === this.userId;
  }

  applyFilters(status: RequestStats) {
    this.filterStatus = status;
    this.loadRequests();
  }
}