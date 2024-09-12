import { Component } from '@angular/core';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ClientTableRowComponent } from '@/shared/ui/client-table-row/client-table-row.component';

@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [CardComponent, ClientTableRowComponent],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.scss',
})
export class ClientPanelComponent {}
