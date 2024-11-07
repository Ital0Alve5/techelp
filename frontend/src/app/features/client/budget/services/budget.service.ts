import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';

import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class BudgetService {
  getBudgetByRequestId(requestId: number) {
    return maintenanceRequests
      .filter((request) => request.id === requestId)
      ?.map((request) => {
        return {
          deviceDescription: request.deviceDescription,
          deviceCategory: request.deviceCategory,
          issueDescription: request.issueDescription,
          price: request.price,
          date: request.date,
          hour: request.hour,
          employee: request.history[request.history.length - 1].employee,
          currentStatus: request.currentStatus,
        };
      })?.[0];
  }

  async approveBudget(
    requestId: number,
    approvalData: { budget: number }
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`/api/client/maintenance-requests/${requestId}/approve`, approvalData);
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
