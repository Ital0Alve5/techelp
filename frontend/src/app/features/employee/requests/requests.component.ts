import { Component } from '@angular/core';

import { EmployeeTableRowComponent } from '../components/components/client-table-row/employee-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { FiltersComponent } from '@/features/filters/filters.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  providers: [RequestsService],
  imports: [EmployeeTableRowComponent, ButtonComponent, LinkAsButtonComponent, FiltersComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  userRequests: Requests[] = this.requestsService.getRequest('Aberta');

  constructor(private requestsService: RequestsService) {
    console.log(this.userRequests)
  }
}
