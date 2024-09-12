import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tr[app-client-table-row]',
  standalone: true,
  imports: [],
  templateUrl: './client-table-row.component.html',
  styleUrl: './client-table-row.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ClientTableRowComponent {
  date = input<string>('');
  desc = input<string>('');
  status = input<string>('');
}
