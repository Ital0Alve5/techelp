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
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);
  employee = this.employeeService.getEmployeeById(this.userId)!;

  isBudgetConfirmationModalOpen = signal(true);

  requestData = this.requestsService.getRequestById(this.requestId)!;

  constructor(
    public currencyMaskService: CurrencyMaskService,
    private requestsService: RequestsService,
    private employeeService: EmployeeService,
    private confirmBudgetService: confirmBudgetService,
    private popupService: PopupService,
    private router: Router,
  ) {}

  openModal() {
    this.isBudgetConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isBudgetConfirmationModalOpen.set(true);
  }

  confirmBudget() {
    const success = this.confirmBudgetService.confirmBudget(
      this.requestData,
      this.employee,
      this.budgetData().value,
    );

    if (!success) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Houve um problema ao orçar!',
      });
      return;
    }

    this.closeModal();

    this.router.navigate([`/funcionario/${this.userId}/solicitacoes`]);

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
