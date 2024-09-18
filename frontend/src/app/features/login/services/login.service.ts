import { Injectable } from '@angular/core';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { InputError } from '@/shared/types/input-error.type';
import { loggedUserMock } from '@/shared/mock/logged-user.mock';
import { Response } from '@/shared/types/response.type';
import { UserData } from '@/shared/types/user-data.type';

@Injectable()
export class LoginService {
  constructor() {}

  checkEmail(emailInput: string) {
    if (registeredUsersMock.find(({ email }) => email === emailInput)) return true;
    return false;
  }

  async validate(data: { email: string; password: string }): Promise<Response<InputError> | Response<UserData>> {
    return new Promise((resolve) => {
      if (this.checkEmail(data.email))
        resolve({
          error: false,
          data: loggedUserMock,
        });
      else
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
