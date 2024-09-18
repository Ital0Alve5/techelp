import { Injectable } from '@angular/core';

import { CpfMaskService } from '@/shared/services/input/masks.service';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { InputError } from '@/shared/types/input-error.type';
import { loggedUserMock } from '@/shared/mock/logged-user.mock';
import { Response } from '@/shared/types/response.type';
import { UserData } from '@/shared/types/user-data.type';

type RegisterUserData = {
  email: string;
  name: string;
  CPF: string;
  phone: string;
  houseNumber: string;
  complement: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  password: string;
};

@Injectable()
export class SignUpService {
  constructor(private cpfMaskService: CpfMaskService) {}

  checkRegisteredUser(email: string, cpf: string) {
    if (registeredUsersMock.find((user) => user.email === email)) return false;
    if (registeredUsersMock.find((user) => this.cpfMaskService.apply(user.cpf) === cpf)) return false;
    return true;
  }

  checkPassword(password: string) {
    if (registeredUsersMock.find((user) => user.password === password)) return true;
    return false;
  }

  async validate(data: { email: string; cpf: string }): Promise<Response<InputError>> {
    return new Promise((resolve) => {
      if (!this.checkRegisteredUser(data.email, data.cpf))
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Usuário já cadastrado!',
          },
        });
      else
        resolve({
          error: false,
          data: {
            error: true,
            message: 'Usuário já cadastrado!',
          },
        });
    });
  }

  async confirmPassword(data: RegisterUserData): Promise<Response<InputError> | Response<UserData>> {
    return new Promise((resolve) => {
      if (this.checkPassword(data.password))
        resolve({
          error: false,
          data: loggedUserMock,
        });
      else
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Senha inválida!',
          },
        });
    });
  }
}
