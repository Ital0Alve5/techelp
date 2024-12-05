import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
import { ClientRequests } from '../types/client-requests.type';
@Injectable()
export class RequestsService {
  async getRequests(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/client/maintenance-requests');
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

  sortRequestsByDateAndHour(requests: ClientRequests[]): ClientRequests[] {
    return requests.sort((a: ClientRequests, b: ClientRequests) => {
      const dateTimeA = new Date(`${a.date.split('/').reverse().join('-')}T${a.hour}`);
      const dateTimeB = new Date(`${b.date.split('/').reverse().join('-')}T${b.hour}`);
      return dateTimeB.getTime() - dateTimeA.getTime();
    });
  }
}
