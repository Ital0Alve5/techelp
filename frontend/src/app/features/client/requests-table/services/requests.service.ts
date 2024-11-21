import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
import { Requests } from '@/shared/types/api/maintenance-requests.type';

@Injectable()
export class RequestsService {
  async getRequests(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/client/maintenance-requests');

      if (response.data?.data?.maintenanceRequestsList) {
        response.data.data.maintenanceRequestsList.sort((a: Requests, b: Requests) => {
          const dateTimeA = new Date(`${a.date.split('/').reverse().join('-')}T${a.hour}`);
          const dateTimeB = new Date(`${b.date.split('/').reverse().join('-')}T${b.hour}`);
          return dateTimeA.getTime() - dateTimeB.getTime();
        });
      }
      console.log("asd")
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
