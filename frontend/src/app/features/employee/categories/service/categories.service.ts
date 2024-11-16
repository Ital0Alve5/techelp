import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Categorie } from '@/shared/types/categorie.type';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
import axiosConfig from '@/axios.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = '/api/employee/categories';

  constructor() {}

  async getCategories(categoryId?: number): Promise<AxiosResponse<Categorie[] | Categorie, ResponseError | ResponseSuccess> | null> {
    try {
      if (categoryId) {
        const response = await axiosConfig(`${this.apiUrl}/${categoryId}`);
        return response;
      }
      const response = await axiosConfig(this.apiUrl);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro da API:', error.response.data);
        return null;
      } else {
        console.error('Erro inesperado:', error);
        throw error;
      }
    }
  }

  async addCategory(categoryName: string): Promise<AxiosResponse<Categorie, ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.post(`${this.apiUrl}/add`, { name: categoryName });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro da API:', error.response.data);
        return null;
      } else {
        console.error('Erro inesperado:', error);
        throw error;
      }
    }
  }

  async removeCategory(categoryId: number): Promise<AxiosResponse<Categorie, ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`${this.apiUrl}/edit/${categoryId}`, { is_active: false });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro da API:', error.response.data);
        return null;
      } else {
        console.error('Erro inesperado:', error);
        throw error;
      }
    }
  }

  async updateCategory(categoryId: number, categoryNewName: string): Promise<AxiosResponse<Categorie, ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`${this.apiUrl}/edit/${categoryId}`, { name: categoryNewName });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro da API:', error.response.data);
        return null;
      } else {
        console.error('Erro inesperado:', error);
        throw error;
      }
    }
  }
}
