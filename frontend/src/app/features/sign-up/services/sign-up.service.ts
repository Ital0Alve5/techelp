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
      };
  }
}
}
