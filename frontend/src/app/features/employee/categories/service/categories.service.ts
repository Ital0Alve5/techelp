import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
import axiosConfig from '@/axios.config';

@Injectable()
export class CategoriesService {
  async getCategories(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.get('/api/employee/categories');
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async getIdByName(categoryId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.get(`/api/employee/categories/${categoryId}`);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('API Error:', error.response.data);
        return null;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async addCategory(categoryName: string): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.post('/api/employee/categories/add', { name: categoryName, is_active: true });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('API Error:', error.response.data);
        return null;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async removeCategory(categoryId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`/api/employee/categories/edit/status/${categoryId}`, { is_active: false });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('API Error:', error.response.data);
        return null;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async updateCategory(categoryId: number, categoryNewName: string): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`/api/employee/categories/edit/name/${categoryId}`, { name: categoryNewName });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('API Error:', error.response.data);
        return null;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }
}