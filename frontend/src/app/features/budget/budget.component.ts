import { Component } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { RouterLink } from '@angular/router';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { UpdateRequestStatusService } from '@/shared/services/update-request-status/update-request-status.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  isApprovalModalOpen = false;
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);
  requestData = {
    deviceDescription: '',
    deviceCategory: '',
    issueDescription: '',
    price: '',
    date: '',
    hour: '',
    employee: '',
    currentStatus: ''
  };

  constructor(private updateRequestStatusService: UpdateRequestStatusService) {
    maintenanceRequests.forEach((request) => {
      if (request.userId === this.userId && this.requestId === request.id) {
        this.requestData = {
          deviceDescription: request.deviceDescription,
          deviceCategory: request.deviceCategory,
          issueDescription: request.issueDescription,
          price: request.price,
          date: request.date,
          hour: request.hour,
          employee: request.history[request.history.length - 1].employee,
          currentStatus: request.currentStatus
        };
      }
    });
  }

  openModal() {
    this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Aprovada');
  
    const request = maintenanceRequests.find(
      (req) => req.userId === this.userId && this.requestId === req.id
    );

    if (request) {
      request.currentStatus = 'Aprovada';

      this.isApprovalModalOpen = true;
    }
  }

  closeModal() {
    this.isApprovalModalOpen = false;
  }
}
