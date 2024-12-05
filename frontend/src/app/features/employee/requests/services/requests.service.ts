import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
import { ClientRequests } from '../types/client-requests.type';

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

  async performMaintenance(
    requestId: number,
    maintenanceDescription: string,
    orientationToClient: string,
  ): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`api/employee/maintenance-requests/${requestId}/perform-maintenance`, {
        maintenanceDescription,
        orientation: orientationToClient,
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

  async finishRequest(requestId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig(`api/employee/maintenance-requests/${requestId}/finish`);
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
