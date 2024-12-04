import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
import { EmployeeRequestHistory } from '@/features/employee/request-details/types/employee-request-history.type';
@Injectable()
export class RequestDetailsService {
  async getRequestDetailsByRequestId(
    requestId: number,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/client/maintenance-requests/' + requestId);
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

  async getRequestHistory(requestId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/client/maintenance-requests/' + requestId + '/history');
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

  sortEmployeeRequestsByDate(requests: EmployeeRequestHistory[]): EmployeeRequestHistory[] {
    return requests
      .sort((a: EmployeeRequestHistory, b: EmployeeRequestHistory) => {
        const dateTimeA = new Date(a.date.split('/').reverse().join('-').replace(' ', 'T'));
        const dateTimeB = new Date(b.date.split('/').reverse().join('-').replace(' ', 'T'));

        return dateTimeA.getTime() - dateTimeB.getTime();
      })
      .reverse();
  }
}
