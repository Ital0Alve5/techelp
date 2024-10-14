import { Component, signal } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { UpdateRequestStatusService } from '@/shared/services/update-request-status/update-request-status.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { routes } from '@/app.routes';

@Component({
  selector: 'app-perform-maintenance',
  standalone: true,
  imports: [RouterLink, ArrowRightIcon, ButtonComponent, ModalComponent, FormsModule],
  providers: [UpdateRequestStatusService],
  templateUrl: './perform-maintenance.component.html',
  styleUrl: './perform-maintenance.component.scss',
})
export class PerformMaintenanceComponent {
  employeeId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/manutencao\/(\d+)/)![1]);
  isMaintenanceModalHidden = signal(true);
  maintenanceDescription = signal('');
  orientationToClient = signal('');

  requestData = {
    deviceDescription: '',
    deviceCategory: '',
    issueDescription: '',
    price: '',
    date: '',
    hour: '',
    employee: '',
    currentStatus: '',
    userId: -1,
  };

  clientData = {
    name: '',
    email: '',
    phone: '',
  };

  constructor(
    private updateRequestStatusService: UpdateRequestStatusService,
    private popupService: PopupService,
    private router: Router,
  ) {
    maintenanceRequests.forEach((request) => {
      if (request.employeeId === this.employeeId && this.requestId === request.id) {
        this.requestData = {
          deviceDescription: request.deviceDescription,
          deviceCategory: request.deviceCategory,
          issueDescription: request.issueDescription,
          price: request.price,
          date: request.date,
          hour: request.hour,
          employee: request.history[request.history.length - 1].employee,
          currentStatus: request.currentStatus,
          userId: request.userId,
        };
      }
    });

    registeredUsersMock.forEach((client) => {
      if (client.id == this.requestData.userId) {
        this.clientData = {
          name: client.name,
          email: client.email,
          phone: `(${client.phone.substring(0, 2)})${client.phone.substring(2, 6)}-${client.phone.substring(6)}`,
        };
      }
    });
  }

  openMaintenanceDetailsModal() {
    this.isMaintenanceModalHidden.set(false);
  }

  confirmMaintenanceDetails(maintenanceDetails: NgForm) {
    maintenanceRequests.forEach((request) => {
      if (request.id === this.requestId) {
        request.maintenanceDescription = maintenanceDetails.form.value.maintenanceDescription;
        request.oritentationToClient = maintenanceDetails.form.value.orientationToClient;

        this.updateRequestStatusService.updateStatus(
          this.requestId,
          'Yasmim Alves de Paula e Silva',
          'Aguardando Pagamento',
        );

        this.popupService.addNewPopUp({
          type: Status.Success,
          message: 'Pagamento efetuado com sucesso!',
        });

        this.router.navigate([`/funcionario/${this.employeeId}/solicitacoes/abertas`]);
      }
    });
  }
}
