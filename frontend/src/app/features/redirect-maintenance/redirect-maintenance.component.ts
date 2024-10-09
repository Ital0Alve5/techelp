import { Component, signal } from '@angular/core';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';

@Component({
  selector: 'app-redirect-maintenance',
  standalone: true,
  templateUrl: './redirect-maintenance.component.html',
  styleUrls: ['./redirect-maintenance.component.scss']
})
export class RedirectMaintenanceComponent {
  isRedirectModalOpen = signal(true);
  selectedEmployeeId: number | null = null;
  registeredEmployees = registeredUsersMock;

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
