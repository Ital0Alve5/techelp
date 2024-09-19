import { Component } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';

import { ClientTableRowComponent } from '@/features/client-panel/components/client-table-row/client-table-row.component';
import { loggedUserMock } from '@/shared/mock/logged-user.mock';
@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [CardComponent, ClientTableRowComponent],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.scss',
})
export class ClientPanelComponent {
  constructor() {}

  userData = loggedUserMock;
}
