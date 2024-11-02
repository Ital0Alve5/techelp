import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ClientDataForm } from '../types/client-data-form.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
@Injectable()
export class SignUpService {
  async createNewClient(data: ClientDataForm): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post(`http://localhost:8080/api/signUp?tempPassword=${data.password}`, data);

      localStorage.setItem('token', response.data.data.token)

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

  async sendPasswordByEmail(data: {
    email: string;
    name: string;
  }): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post('http://localhost:8080/api/sendPassword', data);
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

  async validate(data: ClientDataForm): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post('http://localhost:8080/api/validateClient', data);
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
}
