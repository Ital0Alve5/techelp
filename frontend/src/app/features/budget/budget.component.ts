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
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent, FormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);

  isPaymentConfirmationModalOpen = signal(true);
  isApprovalModalOpen = signal(true);
  isRejectModalOpen = signal(true);
  rejectReason = signal('');

  requestData = {
    deviceDescription: '',
    deviceCategory: '',
    issueDescription: '',
    price: '',
    date: '',
    hour: '',
    employee: '',
    currentStatus: '',
  };

  constructor(
    private popupService: PopupService,
    private router: Router,
    private updateRequestStatusService: UpdateRequestStatusService,
  ) {
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
    this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Paga');

    this.closeModalPayment();

    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Pagamento efetuado com sucesso!',
    });
  }

  openModalApprove() {
    this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Aprovada');
    this.isApprovalModalOpen.set(false);
  }

  closeModalApprove() {
    this.isApprovalModalOpen.set(true);
  }

  openModalReject() {
    this.isRejectModalOpen.set(false);
  }

  closeModalReject() {
    this.isRejectModalOpen.set(true);
  }

  confirmReject(rejectForm: NgForm) {
    if (rejectForm.valid) {
      const rejectionReason = rejectForm.value.rejectReason;

      this.updateRequestStatusService.updateStatus(
        this.requestId,
        this.requestData.employee,
        'Rejeitada',
        rejectionReason,
      );

      this.closeModalReject();

      this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);
    }
  }
}
