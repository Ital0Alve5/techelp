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

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent, FormsModule],
  providers: [BudgetService, RequestsService],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);

  isPaymentConfirmationModalOpen = signal(true);
  isApprovalModalOpen = signal(true);
  isRejectModalOpen = signal(true);
  rejectReason = signal('');

  requestData: any = null;  

  constructor(
    private popupService: PopupService,
    private router: Router,
    private requestsService: RequestsService,
    private budgetService: BudgetService,
  ) {}

  ngOnInit(): void {
    // Carrega os dados do orçamento quando o componente é inicializado
    this.budgetService.getBudgetByRequestId(this.requestId).then((data) => {
      this.requestData = data;
    }).catch((error) => {
      console.error('Erro ao carregar dados do orçamento:', error);
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro ao carregar os dados do orçamento.',
      });
    });
  }

  openModalPayment() {
    this.isPaymentConfirmationModalOpen.set(false);
  }

  closeModalPayment() {
    this.isPaymentConfirmationModalOpen.set(true);
  }

  confirmPayment() {
    this.requestsService.updateStatus(this.requestId, this.requestData?.employee, 'Paga');
    this.closeModalPayment();
    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);
    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Pagamento efetuado com sucesso!',
    });
  }

  openModalApprove() {
    this.requestsService.updateStatus(this.requestId, this.requestData?.employee, 'Aprovada');
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

    this.requestsService.updateStatus(
      this.requestId,
      this.requestData?.employee,
      'Rejeitada',
      rejectionReason,
    );

    this.closeModalReject();
    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);
  }
}
