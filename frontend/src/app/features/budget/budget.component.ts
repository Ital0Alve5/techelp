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

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
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
    currentStatus: '',
  };

  constructor(private popupService: PopupService, private router: Router) {
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
    this.isPaymentConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isPaymentConfirmationModalOpen.set(true);
  }

  confirmPayment() {
    maintenanceRequests.forEach((request) => {
      if (request.userId === this.userId && this.requestId === request.id) {

        const today = new Date().toLocaleDateString();
        const time = new Date();
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = time.getMinutes().toString().padStart(2, '0');

        request.history.push({
          date: today,
          hour: `${hour}:${minute}`,
          fromStatus: 'Arrumada',
          toStatus: 'Concluída',
          employee: 'Heitor',
        });

        request.currentStatus = "Concluída";
      }
    });

    this.closeModal();

    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: "Pagamento efetuado com sucesso!",
    });
  }
}
