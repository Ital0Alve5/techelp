import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { BudgetService } from './services/budget.service';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { ClientRequests } from '../requests-table/types/client-requests.type';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent, FormsModule],
  providers: [BudgetService, RequestsService],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);

  isPaymentConfirmationModalOpen = signal(true);
  isApprovalModalOpen = signal(true);
  isRejectModalOpen = signal(true);
  rejectReason = signal('');

  requestData = signal<ClientRequests>({
    id: 0,
    categoryName: '',
    deviceDescription: '',
    issueDescription: '',
    budget: 0,
    orientation: null,
    rejectReason: null,
    status: '',
    lastEmployee: null,
    date: '',
    hour: '',
  });

  constructor(
    private popupService: PopupService,
    private router: Router,
    private budgetService: BudgetService,
  ) {}

  ngOnInit(): void {
    this.getRequestDetailsByRequestId();
  }

  async getRequestDetailsByRequestId() {
    const success = await this.budgetService.getBudgetByRequestId(this.requestId);
    if (!success?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in success.data) {
      Object.values(success.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
    const maintenanceRequestDetails = success.data.data as unknown;
    this.requestData.set(maintenanceRequestDetails as ClientRequests);
  }

  openModalPayment() {
    this.isPaymentConfirmationModalOpen.set(false);
  }

  closeModalPayment() {
    this.isPaymentConfirmationModalOpen.set(true);
  }

  confirmPayment() {
    // this.requestsService.updateStatus(this.requestId, this.requestData()?.lastEmployee, 'Paga');
    this.closeModalPayment();
    this.router.navigate([`/cliente/solicitacoes`]);
    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Pagamento efetuado com sucesso!',
    });
  }

  async openModalApprove() {
    try {
      const response = await this.budgetService.approveBudget(this.requestId);

      if (!response?.data) {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: `Erro ao aprovar serviço: ${response?.data.message || 'Erro desconhecido'}`,
        });
        return;
      }

      if ('errors' in response.data) {
        Object.values(response.data.errors).forEach((error) => {
          this.popupService.addNewPopUp({
            type: Status.Error,
            message: error,
          });
        });
        return;
      }

      this.popupService.addNewPopUp({
        type: Status.Success,
        message: `Serviço aprovado: ${response.data.message}`,
      });
    } catch (error) {
      console.error('Erro ao aprovar serviço:', error);
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro inesperado ao aprovar o serviço.',
      });
    }

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
    if (!rejectForm.valid) return;
    const rejectionReason = rejectForm.value.rejectReason;

    console.log(rejectionReason);

    // this.requestsService.updateStatus(this.requestId, this.requestData()?.employee, 'Rejeitada', rejectionReason);

    this.closeModalReject();
    this.router.navigate([`/cliente/solicitacoes`]);
  }
}
