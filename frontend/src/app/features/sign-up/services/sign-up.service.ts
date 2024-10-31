import { Injectable } from '@angular/core';

import { CpfMaskService } from '@/shared/services/input/masks.service';
import { Authenticator } from '@/core/auth/authenticator.service';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import axios, { AxiosResponse } from 'axios';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ClientDataForm } from '../types/client-data-form.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';
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

  async createNewClient(data: ClientDataForm): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post('http://localhost:8080/api/signUp', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async sendPasswordByEmail(data: {
    email: string;
    name: string;
  }): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post('http://localhost:8080/api/sendPassword', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async validate(data: ClientDataForm): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axios.post('http://localhost:8080/api/validateClient', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }

    // async confirmPassword(data: RegisterUserData): Promise<Response<InputError> | Response<{ userId: number }>> {
    // return new Promise((resolve) => {
    //   if (!this.checkPassword(data.password)) {
    //     resolve({
    //       error: true,
    //       data: {
    //         error: true,
    //         message: 'Senha inválida!',
    //       },
    //     });
    //     return;
    //   }

    //   let userId;
    //   do {
    //     userId = Math.floor(Math.random() * 99) + 1;
    //   } while (userId === 1 || userId === 2 || userId === 3);

    //   registeredUsersMock.push({
    //     id: userId,
    //     cpf: data.CPF.replace(/\D+/g, ''),
    //     name: data.name,
    //     email: data.email,
    //     phone: data.phone.replace(/\D+/g, ''),
    //     password: data.password,
    //     address: {
    //       cep: data.cep,
    //       neighborhood: data.bairro,
    //       city: data.cidade,
    //       state: data.estado,
    //       street: data.rua,
    //       number: Number.parseInt(data.houseNumber),
    //       complement: data.complement,
    //     },
    //   });

    //   this.authenticator.authenticate(true);

    //   localStorage.setItem('userId', userId + '');

    //   resolve({
    //     error: false,
    //     data: {
    //       userId,
    //     },
    //   });
    // });
    // }
  }
}
