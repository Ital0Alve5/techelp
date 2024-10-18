import { Component, input, OnInit, signal } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { ClientsService } from '@/shared/services/clients/clients.service';
import { UpdateRequestStatusService } from '@/shared/services/update-request-status/update-request-status.service';
import { ModalComponent } from '../../../../../shared/ui/modal/modal.component';

@Component({
  selector: 'tr[app-employee-table-row]',
  standalone: true,
  imports: [ButtonComponent, LinkAsButtonComponent, ModalComponent],
  templateUrl: './employee-table-row.component.html',
  styleUrl: './employee-table-row.component.scss',
})
export class EmployeeTableRowComponent implements OnInit {
  date = input<string>('');
  id = input.required<number>();
  employeeId = input.required<number>();
  userId = input.required<number>();
  hideModal = signal<boolean>(true);
  issueDescription = input(null, {
    transform: (value: string | null) => {
      if (value && value.length > 30) {
        value = value.slice(0, 30);
      }
      return value;
    },
  });
  deviceDescription = input(null, {
    transform: (value: string | null) => {
      if (value && value.length > 30) {
        value = value.slice(0, 30);
      }
      return value;
    },
  });
  userName: string | undefined;
  status = input<string>('');

  constructor(
    private clientsService: ClientsService,
    private updateRequestStatusService: UpdateRequestStatusService,
  ) {}

  ngOnInit() {
    this.userName = this.clientsService.getClientById(this.userId())?.name;
    console.log(this.userName);
  }
  openModal() {
    this.hideModal.set(false);
  }

  closeModal() {
    this.hideModal.set(true);
  }

  endRequest() {
    if (this.userName) {
      this.updateRequestStatusService.updateStatus(this.id(), this.userName, 'Finalizada');
    }
    this.hideModal.set(true);
  }
}
