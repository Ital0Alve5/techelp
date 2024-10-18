import { Component } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { Router, RouterLink } from '@angular/router';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';


interface RequestHistory {
  date: string;
  hour: string;
  fromStatus: string;
  toStatus: string;
  employee: string;
}

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink],
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/solicitacao\/(\d+)/)![1]);

  requestData = {
    deviceDescription: '',
    deviceCategory: '',
    issueDescription: '',
    date: '',
    hour: '',
    employee: '',
    currentStatus: ''
  };
  requestHistory: RequestHistory[] = [];

  constructor(public router: Router,) {
    const request = maintenanceRequests.find(
      (request) => request.userId === this.userId && request.id === this.requestId,
    );

    if (request) {
      this.requestData = {
        deviceDescription: request.deviceDescription,
        deviceCategory: request.deviceCategory,
        issueDescription: request.issueDescription,
        date: request.date,
        hour: request.hour,
        employee: request.history[request.history.length - 1].employee,
        currentStatus: request.currentStatus
      };

      this.requestHistory = request.history.map((item) => ({
        date: item.date,
        hour: item.hour,
        fromStatus: item.fromStatus,
        toStatus: item.toStatus,
        employee: item.employee,
      }));
    }
  }
}
