import { Injectable } from '@angular/core';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';

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
  async rejectBudget(requestId : number, reason : string){
    try {
      const response = await axiosConfig('/api/client/maintenance-requests/'+requestId+'/reject');
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
