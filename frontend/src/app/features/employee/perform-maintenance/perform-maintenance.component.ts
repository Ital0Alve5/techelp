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
import { RequestsService } from '../requests/services/requests.service';
import { ClientsService } from '@/shared/services/clients/clients.service';
import { EmployeeService } from '@/shared/services/employees/employee.service';
import { confirmBudgetService } from '../make-budget/services/confirm-budget.service';
import { ClientRequests } from '../requests/types/client-requests.type';
import { CurrencyMaskService } from '@/shared/services/input/masks.service';
import { Employee } from '@/shared/types/employee.type';

@Component({
  selector: 'app-perform-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ArrowRightIcon, ButtonComponent, ModalComponent, SelectComponent],
  providers: [
    RequestsService,
    RedirectMaintenanceService,
    ClientsService,
    EmployeeService,
    confirmBudgetService,
  ],
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

  registeredEmployees = signal<Employee[]>([
    {
      id: 0,
      name: '',
      email: '',
      birthdate: '',
      password: '',
    },
  ]);

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
    clientEmail: '',
    clientPhone: '',
  });

  clientData = this.clientsService.getClientById(1)!;

  constructor(
    private popupService: PopupService,
    private router: Router,
    private redirectMaintenanceService: RedirectMaintenanceService,
    private clientsService: ClientsService,
    private employeeService: EmployeeService,
    private requestsService: RequestsService,
    private confirmBudgetService: confirmBudgetService,
    public currencyMaskService: CurrencyMaskService,
  ) {
    this.fetchEmployees();
    this.getRequestDetailsByRequestId();
  }

  async fetchEmployees() {
    const response = await this.employeeService.getAllEmployeesExceptMeApi();

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

    const registeredEmployees = response?.data?.data?.['allEmployeesList'] as unknown;
    this.registeredEmployees.set(registeredEmployees as Employee[]);
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
    const employeeEmail = this.registeredEmployees().find((employee) => employee.id === this.selectedEmployeeId)?.email;

    if (!employeeEmail) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Funcionário não encontrado.',
      });
      return;
    }

    const success = this.redirectMaintenanceService.redirectMaintenance(this.requestId, employeeEmail);

    if (!success) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Solicitação de manutenção não encontrada.',
      });
      return;
    }

    this.closeRedirectModal();
    this.router.navigate([`/funcionario/solicitacoes`]);
    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Manutenção redirecionada com sucesso!',
    });
  }

  openMaintenanceDetailsModal() {
    this.isMaintenanceModalHidden.set(false);
  }

  async confirmMaintenanceDetails(maintenanceDetails: NgForm) {
    if (!maintenanceDetails.form.value.maintenanceDescription || !maintenanceDetails.form.value.orientationToClient) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    try {
      const response = await this.requestsService.performMaintenance(
        this.requestId,
        maintenanceDetails.form.value.maintenanceDescription,
        maintenanceDetails.form.value.orientationToClient
      );
      console.log(response)

      if (response?.data) {
        console.log('Resposta da requisição de manutenção:', response.data);
        this.router.navigate([`/funcionario/solicitacoes`]);

        this.popupService.addNewPopUp({
          type: Status.Success,
          message: 'Manutenção confirmada!',
        });
      } else {
        console.log('Resposta sem dados:', response);
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: 'Algo deu errado ao realizar a manutenção!',
        });
      }
    } catch (error) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro ao tentar realizar a manutenção!',
      });
    }
  }
}
