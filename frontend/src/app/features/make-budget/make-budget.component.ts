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
import { InputComponent } from '@/shared/ui/input/input.component';

@Component({
  selector: 'app-make-budget',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    ArrowRightIcon,
    RouterLink,
    ModalComponent,
    FormsModule,
    InputComponent
  ],
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

  constructor(
    private popupService: PopupService,
    private router: Router,
    private updateRequestStatusService: UpdateRequestStatusService
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
    const parsedBudget = parseFloat(this.budgetValue); 

    if (parsedBudget > 0) {
      this.requestData.price = parsedBudget.toString();
      this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Orçada');

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
}
