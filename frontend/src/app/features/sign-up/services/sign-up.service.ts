import { Injectable } from '@angular/core';

import { CpfMaskService } from '@/shared/services/input/masks.service';
import { Authenticator } from '@/core/auth/authenticator.service';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { InputError } from '@/shared/types/input-error.type';
import { loggedUserMock } from '@/shared/mock/logged-user.mock';
import { Response } from '@/shared/types/api/response.type';
import { UserData } from '@/shared/types/api/user-data.type';

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
  passwordGenerated: number = 0;

  constructor(
    private cpfMaskService: CpfMaskService,
    private authenticator: Authenticator,
  ) {}

  checkRegisteredUser(email: string, cpf: string) {
    if (registeredUsersMock.find((user) => user.email === email)) return false;
    if (registeredUsersMock.find((user) => this.cpfMaskService.apply(user.cpf) === cpf)) return false;
    return true;
  }

  checkPassword(password: string) {
    if (Number.parseInt(password) === this.passwordGenerated) return true;
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
      else {
        this.passwordGenerated = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        console.log(this.passwordGenerated);
        resolve({
          error: false,
          data: {
            error: false,
            message: '',
          },
        });
      }
    });
  }

  async confirmPassword(data: RegisterUserData): Promise<Response<InputError> | Response<UserData>> {
    return new Promise((resolve) => {
      if (this.checkPassword(data.password)) {
        registeredUsersMock.push({
          cpf: data.CPF.replace(/\D+/g, ''),
          name: data.name,
          email: data.email,
          phone: data.phone.replace(/\D+/g, ''),
          password: data.password,
          address: {
            cep: data.cep,
            neighborhood: data.bairro,
            city: data.cidade,
            state: data.estado,
            street: data.rua,
            number: Number.parseInt(data.houseNumber),
            complement: data.complement,
          },
        });

        this.authenticator.authenticate(true);

        resolve({
          error: false,
          data: loggedUserMock,
        });
      } else {
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Senha inválida!',
          },
        });
      }
    });
  }
}
