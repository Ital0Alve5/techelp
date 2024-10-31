import { Injectable } from '@angular/core';

import { Authenticator } from '@/core/auth/authenticator.service';
import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ClientDataForm } from '../types/client-data-form.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
@Injectable()
export class SignUpService {
  constructor(private authenticator: Authenticator) {}

  async createNewClient(data: ClientDataForm): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post(`http://localhost:8080/api/signUp?tempPassword=${data.password}`, data);

      this.authenticator.authenticate(true);

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
