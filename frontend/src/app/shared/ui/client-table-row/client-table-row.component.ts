import { Component, model, input, ViewEncapsulation } from '@angular/core';

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
  desc = input(null, {
    transform: (value: String | null) => {
      if (value && value.length > 30) {
        value = value.slice(0, 30);
      }
      return value;
    },
  });
  status = input<string>('');
}
