import { Injectable } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';
import { Response } from '@/shared/types/api/response.type';
import { deviceCategories } from '@/shared/mock/device-categories.mock';
import { Categorie } from '@/shared/types/categorie.type';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class RequestMaintenanceService {
  async getCategories(): Promise<Categorie[]> {
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
      if (!data) {
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Algo deu errado!',
          },
        });
        return;
      }

      let id;
      do {
        id = Math.floor(Math.random() * 99) + 1;
      } while (id === 1 || id === 2 || id === 3 || id === 4);

      const currentDate = new Date();
      maintenanceRequests.push({
        id,
        userId: userId,
        employeeId: 0,
        deviceDescription: data.deviceDescription,
        deviceCategory: data.deviceCategory,
        issueDescription: data.defectDescription,
        price: '',
        date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
        hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
        currentStatus: 'Aberta',
        rejectReason: '',
        maintenanceDescription: '',
        oritentationToClient: '',
        history: [],
      });

      resolve({
        error: false,
        data: {
          userId,
        },
      });
    });
  }
}
