import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr[app-categorie-table-row]',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, FormsModule],
  templateUrl: './categorie-table-row.component.html',
  styleUrls: ['./categorie-table-row.component.scss'],
})
export class CategorieTableRowComponent {
  categorieLabel = input.required<string>();
  categorieId = input.required<number>();

  editCategory = output<void>();
  deleteCategory = output<void>();

  openEditCategoryModal() {
    this.editCategory.emit();
  }

  openDeleteCategoryModal() {
    this.deleteCategory.emit();
  }
}