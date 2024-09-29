import { Component, input } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';

@Component({
  selector: 'tr[app-client-table-row]',
  standalone: true,
  imports: [ButtonComponent, LinkAsButtonComponent],
  templateUrl: './client-table-row.component.html',
  styleUrl: './client-table-row.component.scss',
})
export class ClientTableRowComponent {
  date = input<string>('');
  description = input(null, {
    transform: (value: string | null) => {
      if (value && value.length > 30) {
        value = value.slice(0, 30);
      }
      return value;
    },
  });
  status = input<string>('');
  id = input.required<number>();
  userId = input.required<number>();

}
