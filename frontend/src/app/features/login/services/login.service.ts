import { Injectable } from '@angular/core';

import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { registeredEmployee } from '@/shared/mock/registered-employee.mock';

import { InputError } from '@/shared/types/input-error.type';
import { Response } from '@/shared/types/api/response.type';

@Injectable()
export class LoginService {
  constructor() {}

  checkRegisteredUsers(emailInput: string, passwordInput: string): number | null {
    const userFound = registeredUsersMock.find(({ email }) => email === emailInput);

    if (userFound && userFound.password === passwordInput) return userFound.id;

    return null;
  }
  checkRegisteredEmployee(employeeIdInput: string, emailInput: string, passwordInput: string): number | null {
    const userFound = registeredEmployee.find(({ id }) => id === parseInt(employeeIdInput));

    if (userFound && userFound.password === passwordInput && userFound.email === emailInput) return userFound.id;

    return null;
  }

  async validate(data: {
    email: string;
    employeeID?: string;
    password: string;
  }): Promise<Response<InputError> | Response<{ userId: number }>> {
    let wasUserFound: number | null;

    if (data.employeeID) {
      wasUserFound = this.checkRegisteredEmployee(data.employeeID, data.email, data.password);
    } else {
      wasUserFound = this.checkRegisteredUsers(data.email, data.password);
    }

    return new Promise((resolve) => {
      if (wasUserFound) {
        localStorage.setItem('userId', wasUserFound + '');
        resolve({
          error: false,
          data: {
            userId: wasUserFound,
          },
        });
      } else
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Dados inválidos',
          },
        });
    });
  }
}
