import { Injectable } from '@angular/core';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class RequestDetailsService {
  async getRequestDetailsByRequestId(requestId: number) : Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/maintenance-requests/'+requestId);
      console.log(response);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  /*  return maintenanceRequests
      .filter((request) => request.id === requestId)
      ?.map((request) => {
        return {
          deviceDescription: request.deviceDescription,
          deviceCategory: request.deviceCategory,
          issueDescription: request.issueDescription,
          date: request.date,
          hour: request.hour,
          employee: request.history.length > 0 ? request.history[request.history.length - 1].employee : null,
          currentStatus: request.currentStatus,
          history: request.history,
        };
      })?.[0]; */
  } 

  async getRequestHistory(requestId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/maintenance-requests/'+requestId+'/history');
      console.log(response);
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
