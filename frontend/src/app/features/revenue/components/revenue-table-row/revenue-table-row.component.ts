import { Component, input } from '@angular/core';

@Component({
  selector: 'tr[revenue-table-row]',
  standalone: true,
  imports: [],
  templateUrl: './revenue-table-row.component.html',
  styleUrl: './revenue-table-row.component.scss'
})
export class RevenueTableRowComponent {
  label = input<string>('');
  value = input<number>(0);

}
