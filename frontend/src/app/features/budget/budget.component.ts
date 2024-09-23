import { Component } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { RouterLink } from '@angular/router';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ModalComponent } from '@/shared/ui/modal/modal.component';

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
  requestData: {
    deviceDescription: string;
    deviceCategory: string;
    issueDescription: string;
    price: string;
    date: string;
    hour: string;
    employee: string;
    currentStatus: string;
    history: Array<{ date: string; hour: string; fromStatus: string; toStatus: string; employee: string }>;
  } = {
    deviceDescription: '',
    deviceCategory: '',
    issueDescription: '',
    price: '',
    date: '',
    hour: '',
    employee: '',
    currentStatus: '',
    history: []
  };

  openModal() {
    this.requestData.currentStatus = 'Aprovada';
    this.requestData.history.push({
      date: '23/09/2024',
      hour: '20:20',
      fromStatus: 'Orçada',
      toStatus: 'Aprovada',
      employee: 'Um funcionario ai',
    });

    const requestIndex = maintenanceRequests.findIndex(
      request => request.id === this.requestId && request.userId === this.userId
    );

    if (requestIndex !== -1) {
      maintenanceRequests[requestIndex].currentStatus = this.requestData.currentStatus;
      maintenanceRequests[requestIndex].history = [...this.requestData.history];
    }

    this.isApprovalModalOpen = true;
  }

  closeModal() {
    this.isApprovalModalOpen = false;
  }

  constructor() {
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
          currentStatus: request.currentStatus,
          history: [...request.history]
        };
      }
    });
  }
}
