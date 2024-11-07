import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';

import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class BudgetService {
  async getBudgetByRequestId(requestId: number): Promise<ResponseSuccess | null> {
    try {
      
      const response: AxiosResponse<ResponseSuccess | ResponseError> = await axiosConfig.get(
        `/api/maintenance-budget/${requestId}`
      );

      if (response.status === 200 && 'data' in response) {
        return response.data as ResponseSuccess;
      } else {
        console.error('Erro na resposta da API:', response);
        return null;
      }
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
