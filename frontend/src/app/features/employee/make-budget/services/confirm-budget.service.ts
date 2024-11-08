import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class confirmBudgetService {
  async confirmBudget(
    requestId: number,
    budgetValue: string,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    budgetValue = budgetValue.replace('R$ ', '').replace('.', '').replace(',', '.');

    try {
      const response = await axiosConfig.put(`/api/employee/maintenance-requests/${requestId}/make-budget`, {
        budget: budgetValue,
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

  async getRequestDetailsByRequestId(
    requestId: number,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig(`/api/employee/maintenance-requests/${requestId}`);
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
