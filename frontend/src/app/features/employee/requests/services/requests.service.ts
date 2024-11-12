import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class RequestsService {
  async getAllOpenRequests(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/employee/maintenance-requests/open');

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

  async getAllRequests(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/employee/maintenance-requests/all');

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

  async getTodayOpenRequests(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/employee/maintenance-requests/open-today');

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

  async getOpenRequestsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig(
        `/api/employee/maintenance-requests/date-range?startDate=${startDate}&endDate=${endDate}`,
      );

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
