import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { RouterLink } from '@angular/router';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
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
  isPaymentConfirmationModalOpen = signal(true);
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

  constructor(private popupService: PopupService, private router: Router, private updateRequestStatusService: UpdateRequestStatusService) {
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

  openModalPayment() {
    this.isPaymentConfirmationModalOpen.set(false);
  }

  closeModalPayment() {
    this.isPaymentConfirmationModalOpen.set(true);
  }

  confirmPayment() {
    this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Concluída');

    this.closeModalPayment();

    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: "Pagamento efetuado com sucesso!",
    });
  }

  openModalApprove() {
    this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Aprovada');
    this.isApprovalModalOpen = true;
  }

  closeModalApprove() {
    this.isApprovalModalOpen = false;
  }
}
