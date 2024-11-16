import { Component, signal, OnInit } from '@angular/core';
import { Categorie } from '@/shared/types/categorie.type';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { TableComponent } from '@/shared/ui/table/table.component';
import { EditIcon } from '@/shared/ui/icons/edit/edit.icon';
import { DeleteIcon } from '@/shared/ui/icons/delete/delete.icon';
import { AddIcon } from '@/shared/ui/icons/add/add.icon';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { CategoriesService } from './service/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ButtonComponent,
    ModalComponent,
    FormsModule,
    RouterLink,
    ArrowRightIcon,
    EditIcon,
    DeleteIcon,
    AddIcon,
    TableComponent,
  ],  
  providers: [RequiredValidator, MinLengthValidator],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  categories: Categorie[] = [];
  newCategorieData = signal({ id: -1, value: '', validation: { error: false, message: '' } });
  selectedCategoryData = signal({ id: -1, value: '', validation: { error: false, message: '' } });

  isNewCategoryModalOpen = signal(true);
  isEditCategoryModalOpen = signal(true);
  isDeleteCategoryModalOpen = signal(true);

  constructor(
    private categoriesService: CategoriesService,
    private requiredValidator: RequiredValidator,
    private minLengthValidator: MinLengthValidator
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    const success = await this.categoriesService.getCategories();
    if (!success?.data) {
      console.error('Erro ao carregar categorias:', success?.data);
      return;
    }
    this.categories = Array.isArray(success.data) ? success.data : [success.data];
  }

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

  async addNewCategory() {
    if (!this.validateNewCategory()) return;

    const success = await this.categoriesService.addCategory(this.newCategorieData().value);
    if (!success?.data) {
      console.error('Erro ao adicionar categoria:', success?.data);
      return;
    }
    this.loadCategories();
    this.closeNewCategoryModal();
  }

  async updateCategory() {
    if (!this.validateEditedCategory()) return;

    const success = await this.categoriesService.updateCategory(
      this.selectedCategoryData().id,
      this.selectedCategoryData().value
    );
    if (!success?.data) {
      console.error('Erro ao atualizar categoria:', success?.data);
      return;
    }
    this.loadCategories();
    this.closeEditCategoryModal();
  }

  async deleteCategory() {
    if (this.selectedCategoryData().id < 0) return;

    const success = await this.categoriesService.removeCategory(this.selectedCategoryData().id);
    if (!success?.data) {
      console.error('Erro ao deletar categoria:', success?.data);
      return;
    }
    this.loadCategories();
    this.closeDeleteCategoryModal();
  }

  validateNewCategory() {
    this.requiredValidator.setNext(this.minLengthValidator);
    this.newCategorieData().validation = this.requiredValidator.validate(this.newCategorieData().value);

    return !this.newCategorieData().validation.error;
  }

  validateEditedCategory() {
    this.requiredValidator.setNext(this.minLengthValidator);
    this.selectedCategoryData().validation = this.requiredValidator.validate(this.selectedCategoryData().value);

    return !this.selectedCategoryData().validation.error;
  }
}
