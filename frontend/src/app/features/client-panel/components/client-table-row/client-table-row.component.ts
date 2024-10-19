import { Component, input } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { LinkAsButtonComponent } from '@/shared/ui/link-as-button/link-as-button.component';
import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';
import { WaitingIcon } from '@/shared/ui/icons/waiting.icon';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-client-table-row]',
  standalone: true,
  imports: [ButtonComponent, LinkAsButtonComponent, AllowVisibilityIcon, WaitingIcon],
  templateUrl: './client-table-row.component.html',
  styleUrl: './client-table-row.component.scss',
})
export class ClientTableRowComponent {
  date = input<string>('');
  status = input<string>('');
  requestId = input.required<number>();
  userId = input.required<number>();
  description = input(null, {
    transform: (value: string | null) => {
      if (value && value.length > 50) {
        value = `${value.slice(0, 50)}...`;
      }

      return value;
    },
  });

  constructor(private router: Router) {}

  onViewRequestDetails() {
    this.router.navigate([`/cliente/${this.userId()}/solicitacao/${this.requestId()}`]);
  }
}
