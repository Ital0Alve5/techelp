import { Injectable } from '@angular/core';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';

@Injectable({
  providedIn: 'root',
})
export class CheckDatabaseService {
  constructor() {}

  checkEmail(emailInput: string) {
    return registeredUsersMock.find(({ email }) => email === emailInput);
  }

  checkCpf(cpfInput: string) {
    return registeredUsersMock.find(({ cpf }) => cpf === cpfInput);
  }
}
