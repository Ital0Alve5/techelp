import { Injectable } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';
import { Response } from '@/shared/types/api/response.type';
import { deviceCategories } from '@/shared/mock/device-categories.mock';
import { Categories } from '../types/categories.type';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
@Injectable()
export class RequestMaintenanceService {
  constructor() {}

  async getCategories(): Promise<Categories> {
    return new Promise((resolve) => {
      resolve(deviceCategories);
    });
  }

  async send(
    userId: number,
    data: {
      deviceDescription: string;
      deviceCategory: string;
      defectDescription: string;
    },
  ): Promise<Response<InputError> | Response<{ userId: number }>> {
    return new Promise((resolve) => {
      if (data) {
        let id;
        do {
          id = Math.floor(Math.random() * 99) + 1;
        } while (id === 1 || id === 2 || id === 3 || id === 4);

        maintenanceRequests.push({
          id,
          userId: userId,
          deviceDescription: data.deviceDescription,
          deviceCategory: data.deviceCategory,
          issueDescription: data.defectDescription,
          price: '99,90',
          date: '01/09/2024',
          hour: '13:24',
          currentStatus: 'Aberta',
          rejectReason: '',
          history: [],
        });
        
        resolve({
          error: false,
          data: {
            userId,
          },
        });
      } else {
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Algo deu errado!',
          },
        });
      }
    });
  }
}
