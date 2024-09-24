import { Injectable } from '@angular/core';

import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
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

  async validate(data: {
    email: string;
    password: string;
  }): Promise<Response<InputError> | Response<{ userId: number }>> {
    const wasUserFound = this.checkRegisteredUsers(data.email, data.password);
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
