import { Component, input } from '@angular/core';

import { ButtonComponent } from '@/shared/ui/button/button.component';

@Component({
  selector: 'tr[app-categorie-table-row]',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './categorie-table-row.component.html',
  styleUrl: './categorie-table-row.component.scss',
})
export class CategorieTableRowComponent {
  categorieLabel = input.required<string>();
  categorieId = input.required<number>();
}
