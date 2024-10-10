import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { registeredEmployee } from '@/shared/mock/registered-employee.mock';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { RouterLink, Router } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
import { RedirectMaintenanceService } from '../services/redirect-maintenance.service';

@Component({
  selector: 'app-perform-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ArrowRightIcon, ButtonComponent, ModalComponent],
  templateUrl: './perform-maintenance.component.html',
  styleUrls: ['./perform-maintenance.component.scss'],
})
export class PerformMaintenanceComponent {
  employeeId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/manutencao\/(\d+)/)![1]);

  isRedirectModalOpen = signal(true);
  selectedEmployeeId: number | null = null;

  registeredEmployees = registeredEmployee.filter(employee => employee.id !== this.employeeId);

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
    private popupService: PopupService,
    private router: Router,
    private redirectMaintenanceService: RedirectMaintenanceService, // Usar o serviço de redirecionamento
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

  openRedirectModal() {
    this.isRedirectModalOpen.set(false);
  }

  closeRedirectModal() {
    this.isRedirectModalOpen.set(true);
  }

  confirmRedirect() {
    if (this.selectedEmployeeId && this.selectedEmployeeId !== this.employeeId) {
  
      const success = this.redirectMaintenanceService.redirectMaintenance(this.requestId, this.selectedEmployeeId!);

      if (success) {
        this.closeRedirectModal();
        this.router.navigate([`/funcionario/${this.employeeId}/solicitacoes/abertas`]);
        this.popupService.addNewPopUp({
          type: Status.Success,
          message: 'Manutenção redirecionada com sucesso!',
        });
      } else {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: 'Solicitação de manutenção não encontrada.',
        });
      }
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Nenhum funcionário foi selecionado ou tentativa de redirecionar para si mesmo.',
      });
    }
  }
}
