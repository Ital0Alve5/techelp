import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class LoginService {
  async validate(
    data: {
      email: string;
      password: string;
    },
    isEmployee?: boolean,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post(`http://localhost:8080/api/login`, {
        ...data,
        userType: isEmployee ? 'employee' : 'client',
      });

      localStorage.setItem('token', response.data.data.token);

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
