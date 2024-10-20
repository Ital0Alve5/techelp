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
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@/shared/ui/input/input.component';
import { RequestsService } from '@/shared/services/requests/requests.service';
@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent, FormsModule, InputComponent],
  providers: [RequestsService],
  templateUrl: './make-budget.component.html',
  styleUrls: ['./make-budget.component.scss'],
})
export class MakeBudgetComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/orcamento\/(\d+)/)![1]);
  isBudgetConfirmationModalOpen = signal(true);
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
  budgetValue: string = '';
  validation: { error: boolean; message: string } | undefined;
  maxBudgetLength: number = 4;

  constructor(
    private popupService: PopupService,
    private router: Router,
    private requestsService: RequestsService,
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

  openModal() {
    this.isBudgetConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isBudgetConfirmationModalOpen.set(true);
  }

  confirmBudget() {
    const parsedBudget = parseFloat(this.budgetValue || '0');

    if (parsedBudget > 0) {
      this.requestData.price = parsedBudget.toString();
      this.requestsService.updateStatus(this.requestId, this.requestData.employee, 'Orçada');

      this.closeModal();
      this.router.navigate([`/funcionario/${this.userId}/solicitacoes/abertas`]);
      this.popupService.addNewPopUp({
        type: Status.Success,
        message: 'Orçamento registrado com sucesso!',
      });
    } else {
      this.validation = { error: true, message: 'O valor do orçamento deve ser maior que zero.' };
    }
  }

  formatBudgetValue(value: string): string {
    if (!value) return '0,00';
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? '0,00' : parsedValue.toFixed(2).replace('.', ',');
  }

  handleBudgetInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/[^0-9]/g, '');

    if (value.length <= this.maxBudgetLength) {
      this.budgetValue = value;
    } else {
      this.budgetValue = value.substring(0, this.maxBudgetLength);
    }
  }
}
