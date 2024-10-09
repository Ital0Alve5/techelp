import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { registeredEmployee } from '@/shared/mock/registered-employee.mock';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { RouterLink } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ButtonComponent } from '@/shared/ui/button/button.component';

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
  registeredEmployees = registeredEmployee;

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

  constructor() {
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
    if (this.selectedEmployeeId) {
      console.log('Manutenção redirecionada para o funcionário ID:', this.selectedEmployeeId);
      this.closeRedirectModal();
    } else {
      console.log('Nenhum funcionário foi selecionado para redirecionamento.');
    }
  }
}
