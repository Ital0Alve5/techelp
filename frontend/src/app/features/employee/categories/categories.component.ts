import { Component, signal } from '@angular/core';
import { Categorie } from '@/shared/types/categorie.type';
import { CategorieTableRowComponent } from './components/categorie-table-row/categorie-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '@/shared/services/crud/categories.service';
import { RouterLink } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { TableComponent } from '@/shared/ui/table/table.component';
import { EditIcon } from '@/shared/ui/icons/edit/edit.icon';
import { DeleteIcon } from '@/shared/ui/icons/delete/delete.icon';
import { AddIcon } from '@/shared/ui/icons/add/add.icon';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { categorieData } from './model/categorie-data.model';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategorieTableRowComponent,
    ButtonComponent,
    ModalComponent,
    FormsModule,
    RouterLink,
    ArrowRightIcon,
    EditIcon,
    DeleteIcon,
    AddIcon,
    TableComponent,
    TextareaComponent,
  ],
  providers: [RequiredValidator, MinLengthValidator],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  categories: Categorie[] = this.categoriesService.getCategories();

  newCategorieData = signal(JSON.parse(JSON.stringify(categorieData)));
  selectedCategoryData = signal(JSON.parse(JSON.stringify(categorieData)));

  isNewCategoryModalOpen = signal(true);
  isEditCategoryModalOpen = signal(true);
  isDeleteCategoryModalOpen = signal(true);

  selectedCategoryId = signal<number | null>(null);
  selectedCategoryName = signal('');

  constructor(
    private categoriesService: CategoriesService,
    private requiredValidator: RequiredValidator,
    private minLengthValidator: MinLengthValidator,
  ) {}

  openNewCategoryModal() {
    this.isNewCategoryModalOpen.set(false);
  }

  closeNewCategoryModal() {
    this.isNewCategoryModalOpen.set(true);
  }

  openEditCategoryModal(categorie: Categorie) {
    this.selectedCategoryData().id = categorie.id;
    this.isEditCategoryModalOpen.set(false);
  }

  closeEditCategoryModal() {
    this.isEditCategoryModalOpen.set(true);
  }

  openDeleteCategoryModal(categorie: Categorie) {
    this.selectedCategoryData().id = categorie.id;
    this.isDeleteCategoryModalOpen.set(false);
  }

  closeDeleteCategoryModal() {
    this.isDeleteCategoryModalOpen.set(true);
  }

  addNewCategory() {
    if (!this.validateNewCategory()) return;

    this.categoriesService.addCategory(this.newCategorieData().value);
    this.newCategorieData().value = '';

    this.categories = this.categoriesService.getCategories();
    this.closeNewCategoryModal();
  }

  updateCategory() {
    if (!this.validateEditedCategory()) return;

    this.categoriesService.updateCategory(this.selectedCategoryData().id!, this.selectedCategoryData().value);
    this.selectedCategoryData().value = '';
    this.selectedCategoryData().id = -1;

    this.categories = this.categoriesService.getCategories();
    this.closeEditCategoryModal();
  }

  deleteCategory() {
    if (!(this.selectedCategoryData().id > 0)) return;

    this.categoriesService.removeCategory(this.selectedCategoryData().id);
    this.categories = this.categoriesService.getCategories();

    this.selectedCategoryData().id = -1;
    this.closeDeleteCategoryModal();
  }

  validateNewCategory() {
    this.requiredValidator.setNext(this.minLengthValidator);
    this.newCategorieData().validation = this.requiredValidator.validate(this.newCategorieData().value);

    if (!this.newCategorieData().validation.error) return true;

    return false;
  }

  validateEditedCategory() {
    this.requiredValidator.setNext(this.minLengthValidator);
    this.selectedCategoryData().validation = this.requiredValidator.validate(this.selectedCategoryData().value);

    if (!this.selectedCategoryData().validation.error) return true;

    return false;
  }
}
