import { Component, signal } from '@angular/core';
import { Categorie } from '@/shared/types/categorie.type';
import { CategorieTableRowComponent } from './components/categorie-table-row/categorie-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '@/shared/services/crud/categories.service';
import { RouterLink } from '@angular/router';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategorieTableRowComponent, ButtonComponent, ModalComponent, FormsModule, RouterLink, ArrowRightIcon],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  categories: Categorie[] = this.categoriesService.getCategories();

  isNewCategoryModalOpen = signal(true);
  isEditCategoryModalOpen = signal(true);
  isDeleteCategoryModalOpen = signal(true);

  newCategoryName = signal('');
  selectedCategoryId = signal<number | null>(null);
  selectedCategoryName = signal('');

  constructor(private categoriesService: CategoriesService) {}

  openNewCategoryModal() {
    this.isNewCategoryModalOpen.set(false);
  }
  
  closeNewCategoryModal() {
    this.isNewCategoryModalOpen.set(true);
  }
  

  addNewCategory(form: NgForm) {
    if (form.valid) {
      this.categoriesService.addCategory(this.newCategoryName());
      this.categories = this.categoriesService.getCategories();
      this.newCategoryName.set('');
      this.closeNewCategoryModal();
    }
  }
  

  openEditCategoryModal(categorie: Categorie) {
    this.selectedCategoryId.set(categorie.id);
    this.selectedCategoryName.set(categorie.label);
    this.isEditCategoryModalOpen.set(false);
  }

  closeEditCategoryModal() {
    this.isEditCategoryModalOpen.set(true);
  }

  updateCategory(form: NgForm) {
    if (form.valid && this.selectedCategoryId()) {
      this.categoriesService.updateCategory(this.selectedCategoryId()!, this.selectedCategoryName());
      this.categories = this.categoriesService.getCategories();
      this.closeEditCategoryModal();
    }
  }

  openDeleteCategoryModal(categorie: Categorie) {
    this.selectedCategoryId.set(categorie.id);
    this.isDeleteCategoryModalOpen.set(false);
  }

  closeDeleteCategoryModal() {
    this.isDeleteCategoryModalOpen.set(true);
  }

  deleteCategory() {
    if (this.selectedCategoryId()) {
      this.categoriesService.removeCategory(this.selectedCategoryId()!);
      this.categories = this.categoriesService.getCategories();
      this.closeDeleteCategoryModal();
    }
  }
}