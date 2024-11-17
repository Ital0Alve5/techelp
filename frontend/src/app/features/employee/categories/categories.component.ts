import { Component, signal } from '@angular/core';
import { Categorie } from '@/shared/types/categorie.type';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from './service/categories.service';
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
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

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
    TextareaComponent,
  ],
  providers: [RequiredValidator, MinLengthValidator, CategoriesService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  categories = signal<Categorie[]>([]);
  newCategorieData = signal(JSON.parse(JSON.stringify(categorieData)));
  selectedCategoryData = signal(JSON.parse(JSON.stringify(categorieData)));

  isNewCategoryModalOpen = signal(true);
  isEditCategoryModalOpen = signal(true);
  isDeleteCategoryModalOpen = signal(true);

  constructor(
    private categoriesService: CategoriesService,
    private requiredValidator: RequiredValidator,
    private minLengthValidator: MinLengthValidator,
    private popupService: PopupService,
  ) {
    this.loadCategories();
  }

  async loadCategories() {
    const response = await this.categoriesService.getCategories();
  
    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }
  
    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
  
    const categoriesList = response.data.data?.['deviceCategories'];
  
    if (Array.isArray(categoriesList)) {
      const categories = categoriesList
        .map(item => ({
          id: Number(item['id']),
          label: item['name'],
          isActive: item['is_active']
        }))
        .filter(category => category.isActive);
  
      this.categories.set(categories.filter(category => category));
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de categorias.',
      });
    }
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

    try {
      const response = await this.categoriesService.addCategory(this.newCategorieData().value);
      if (response && response.data) {
        this.newCategorieData().value = '';
        await this.loadCategories();
        this.closeNewCategoryModal();
      } else {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: 'Erro ao adicionar a categoria.',
        });
      }
    } catch (error) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro inesperado ao adicionar a categoria.',
      });
    }
  }

  async updateCategory() {
    if (!this.validateEditedCategory()) return;

    try {
      const response = await this.categoriesService.updateCategory(this.selectedCategoryData().id!, this.selectedCategoryData().value);
      if (response && response.data) {
        this.selectedCategoryData().value = '';
        this.selectedCategoryData().id = -1;
        await this.loadCategories();
        this.closeEditCategoryModal();
      } else {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: 'Erro ao atualizar a categoria.',
        });
      }
    } catch (error) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro inesperado ao atualizar a categoria.',
      });
    }
  }

  async deleteCategory() {
    if (this.selectedCategoryData().id < 0) return;

    try {
      const response = await this.categoriesService.removeCategory(this.selectedCategoryData().id!);
      if (response && response.data) {
        await this.loadCategories();
        this.closeDeleteCategoryModal();
      } else {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: 'Erro ao deletar a categoria.',
        });
      }
    } catch (error) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro inesperado ao deletar a categoria.',
      });
    }
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