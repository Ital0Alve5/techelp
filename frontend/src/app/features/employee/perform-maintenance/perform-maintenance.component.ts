import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
import { SelectComponent } from '@/shared/ui/select/select.component';

import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { RedirectMaintenanceService } from './services/redirect-maintenance.service';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { ClientsService } from '@/shared/services/clients/clients.service';
import { EmployeeService } from '@/shared/services/employees/employee.service';
import { MakeMaintenanceService } from './services/make-maintenance.service';

@Component({
  selector: 'app-perform-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ArrowRightIcon, ButtonComponent, ModalComponent, SelectComponent],
  providers: [RequestsService, RedirectMaintenanceService, ClientsService, EmployeeService, MakeMaintenanceService],
  templateUrl: './perform-maintenance.component.html',
  styleUrls: ['./perform-maintenance.component.scss'],
})
export class PerformMaintenanceComponent {
  employeeId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/manutencao\/(\d+)/)![1]);

  maintenanceDescription = signal('');
  orientationToClient = signal('');

  isMaintenanceModalHidden = signal(true);
  isRedirectModalOpen = signal(true);
  selectedEmployeeId: number | null = null;

  registeredEmployees = this.employeeService.getAllEmployeesExceptMe(this.employeeId);
  requestData = this.requestsService.getRequestById(this.requestId)!;
  clientData = this.clientsService.getClientById(this.requestData.userId)!;

  constructor(
    private popupService: PopupService,
    private router: Router,
    private redirectMaintenanceService: RedirectMaintenanceService,
    private requestsService: RequestsService,
    private clientsService: ClientsService,
    private employeeService: EmployeeService,
    private makeMaintenanceService: MakeMaintenanceService,
  ) {}

  openRedirectModal() {
    this.isRedirectModalOpen.set(false);
  }

  closeRedirectModal() {
    this.isRedirectModalOpen.set(true);
  }

  confirmRedirect() {
    if (!this.selectedEmployeeId) {
      {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: 'Funcionário inválido.',
        });
      }
      return;
    }

    const success = this.redirectMaintenanceService.redirectMaintenance(this.requestId, this.selectedEmployeeId);

    if (!success) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Solicitação de manutenção não encontrada.',
      });
      return;
    }

    this.closeRedirectModal();
    this.router.navigate([`/funcionario/${this.employeeId}/solicitacoes`]);
    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Manutenção redirecionada com sucesso!',
    });
  }

  openMaintenanceDetailsModal() {
    this.isMaintenanceModalHidden.set(false);
  }

  confirmMaintenanceDetails(maintenanceDetails: NgForm) {
    const wasMaintenanceConfirmed = this.makeMaintenanceService.confirmMaintenanceDetails(
      this.requestId,
      this.employeeId,
      maintenanceDetails.form.value.maintenanceDescription,
      maintenanceDetails.form.value.orientationToClient,
    );

    if (wasMaintenanceConfirmed) {
      this.router.navigate([`/funcionario/${this.employeeId}/solicitacoes`]);

      this.popupService.addNewPopUp({
        type: Status.Success,
        message: 'Manutenção confirmada!',
      });
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
    }
  }
}
