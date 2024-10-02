import { Component, input, OnInit } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { ClientsService } from '@/shared/services/clients/clients.service';

@Component({
  selector: 'tr[app-employee-table-row]',
  standalone: true,
  imports: [ButtonComponent, LinkAsButtonComponent],
  templateUrl: './employee-table-row.component.html',
  styleUrl: './employee-table-row.component.scss',
})
export class EmployeeTableRowComponent implements OnInit {
  date = input<string>('');
  id = input.required<number>();
  userId = input.required<number>();
  issueDescription = input.required<string>();
  deviceDescription = input.required<string>();
  userName: string | undefined;
  status = input<string>('');

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.userName = this.clientsService.getClientById(this.userId())?.name;
    console.log(this.userName);
  }
}
