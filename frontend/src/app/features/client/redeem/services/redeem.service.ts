import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class RedeemService {
  async redeemRequestByRequestId(requestId: number) : Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/client/maintenance-requests/'+requestId);
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

  async redeemRequest(requestId: number,): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig.put(`/api/client/maintenance-requests/${requestId}/redeem`);
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
}