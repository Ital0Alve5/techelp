import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { EmployeeService } from '@/shared/services/employees/employee.service';
import { confirmBudgetService } from './services/confirm-budget.service';
import { CurrencyMaskService } from '@/shared/services/input/masks.service';
import { budgetData } from './model/budget-data.model';
import { ClientRequests } from '../requests/types/client-requests.type';
@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent, FormsModule, InputComponent],
  providers: [RequestsService, EmployeeService, confirmBudgetService],
  templateUrl: './make-budget.component.html',
  styleUrls: ['./make-budget.component.scss'],
})
export class MakeBudgetComponent {
  budgetData = signal(JSON.parse(JSON.stringify(budgetData)));
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);

  isBudgetConfirmationModalOpen = signal(true);

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
    clientId: 0,
    clientName: '',
  });

  constructor(
    public currencyMaskService: CurrencyMaskService,
    private confirmBudgetService: confirmBudgetService,
    private popupService: PopupService,
    private router: Router,
  ) {
    this.getRequestDetailsByRequestId();
  }

  async getRequestDetailsByRequestId() {
    const response = await this.confirmBudgetService.getRequestDetailsByRequestId(this.requestId);
    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
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
    const maintenanceRequestDetails = response.data.data as unknown;
    this.requestData.set(maintenanceRequestDetails as ClientRequests);
  }

  openModal() {
    this.isBudgetConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isBudgetConfirmationModalOpen.set(true);
  }

  async confirmBudget() {
    const response = await this.confirmBudgetService.confirmBudget(this.requestId, this.budgetData().value);

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
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

    this.closeModal();

    this.router.navigate([`/funcionario/solicitacoes`]);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Orçamento realizado com sucesso!',
    });
  }

  handleBudgetInput() {
    if (!this.budgetData().value || this.budgetData().value === 'R$ 0,00') {
      this.budgetData().validation = { error: true, message: 'O valor do orçamento deve ser maior que zero.' };
      return;
    }
    this.budgetData().validation = { error: false, message: '' };
    this.openModal();
  }
}
