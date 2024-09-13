import { Component, signal } from '@angular/core';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ClientTableRowComponent } from '@/features/client-panel/components/client-table-row/client-table-row.component';

@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [CardComponent, ClientTableRowComponent],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.scss',
})
export class ClientPanelComponent {
  requests = signal([
    { id: 1, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'ORÇADA' },
    { id: 2, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'APROVADA' },
    { id: 3, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'ABERTA' },
    { id: 4, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'REJEITADA' },
    { id: 5, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'PAGA' },
    { id: 6, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'ORÇADA' },
    { id: 7, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'ORÇADA' },
    { id: 8, date: '20/12/24', description: 'lorem ipsum dolor sit alguma coisa', state: 'ORÇADA' },
  ]);
}
