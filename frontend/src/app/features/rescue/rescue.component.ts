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
  selector: 'app-rescue',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent],
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.scss'],
})
export class RescueComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/resgate\/(\d+)/)![1]);
  isRescueConfirmationModalOpen = signal(true);
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
    this.isRescueConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isRescueConfirmationModalOpen.set(true);
  }

  confirmRescue() {
    this.updateRequestStatusService.updateStatus(this.requestId, this.requestData.employee, 'Orçada');

    this.closeModal();
    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);
    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Solicitação resgatada com sucesso!',
    });
  }
}
