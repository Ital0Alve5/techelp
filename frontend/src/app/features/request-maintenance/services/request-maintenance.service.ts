import { Injectable } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';
import { Response } from '@/shared/types/response.type';
import { deviceCategories } from '@/shared/mock/device-categories.mock';
import { Categories } from '../types/categories.type';
import { loggedUserMock } from '@/shared/mock/logged-user.mock';
import { UserData } from '@/shared/types/user-data.type';

@Injectable()
export class RequestMaintenanceService {
  constructor() {}

  async getCategories(): Promise<Categories> {
    return new Promise((resolve) => {
      resolve(deviceCategories);
    });
  }

  async send(data: {
    deviceDescription: string;
    deviceCategory: string;
    defectDescription: string;
  }): Promise<Response<InputError> | Response<UserData>> {
    return new Promise((resolve) => {
      if (data) {
        loggedUserMock.requests.push({
          id: 1,
          date: '01/09/2024',
          hour: '13:24',
          deviceDescription: data.deviceDescription,
          status: 'Aberta',
        });

        resolve({
          error: false,
          data: loggedUserMock,
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
