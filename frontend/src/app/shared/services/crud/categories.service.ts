import { Injectable } from '@angular/core';
import { Categorie } from '@/shared/types/categorie.type';
import { deviceCategories } from '@/shared/mock/device-categories.mock';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor() {}

  //Retorna todas categorias. Se passar um id como parametro, retorna apenas a categoria do ID.
  getCategories(categoryId?: number): Categorie[] {
    let categories: Categorie[] = [...deviceCategories];
    if (categoryId) {
      categories = categories.filter(({ id }) => id === categoryId);
    }
    return categories;
  }

  //Retorna o ID da categoria a partir do nome dela. Se não for encontrado, retorna -1
  getIdByName(categoryName: string): number {
    return (deviceCategories.findIndex((category) => category.label === categoryName)) + 1;
  }

  //Adiciona uma categoria. Passar o nome da categoria por parametro
  addCategory(categoryName: string) {
    const newId = deviceCategories[deviceCategories.length - 1].id + 1;
    deviceCategories.push({
      id: newId,
      label: categoryName,
    });
  }

  //Remove uma categoria pelo ID
  removeCategory(categoryId: number) {
    const index = categoryId - 1;
    deviceCategories.splice(index, 1);
  }

  //Atualiza o nome de uma categoria. Deve passar o ID e o novo nome como parametro
  updateCategory(categoryId: number, categoryNewName: string) {
    const index = categoryId - 1;
    deviceCategories[index].label = categoryNewName;
  }
}
