import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';

import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class BudgetService {
  async getBudgetByRequestId(requestId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig(`/api/client/maintenance-requests/${requestId}`);

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

  async approveBudget(requestId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`/api/client/maintenance-requests/${requestId}/approve-budget`);
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

  async rejectBudget(
    requestId: number,
    rejectReason: string,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`/api/client/maintenance-requests/${requestId}/reject`, {
        rejectReason: rejectReason,
      });
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
