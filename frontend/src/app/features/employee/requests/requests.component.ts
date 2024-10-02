import { Component } from '@angular/core';
import { EmployeeTableRowComponent } from '../components/components/client-table-row/employee-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { RequestsService } from '@/shared/services/requests/requests.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  providers: [RequestsService],
  imports: [EmployeeTableRowComponent, ButtonComponent, LinkAsButtonComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  userRequests: Requests[] = [];

  constructor(private requestsService: RequestsService) {
    this.loadRequests();
  }

  loadRequests() {
    this.userRequests = this.requestsService.getRequest('Aberta').sort((a, b) => {
      const dateA = this.parseBrazilianDate(a.date);
      const dateB = this.parseBrazilianDate(b.date);

      if (!dateA || !dateB) {
        return 0;
      }

      return dateA.getTime() - dateB.getTime();
    });
    console.log(this.userRequests);
  }

  parseBrazilianDate(dateString: string): Date | null {
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) {
      return null;
    }
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
}
