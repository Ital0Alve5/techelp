import { Component } from '@angular/core';
import { deviceCategories } from '@/shared/mock/device-categories.mock';
import { Categorie } from '@/shared/types/categorie.type';
import { CategorieTableRowComponent } from './components/categorie-table-row/categorie-table-row.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategorieTableRowComponent, ButtonComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  categories: Categorie[] = deviceCategories;
}
