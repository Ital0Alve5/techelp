import { Injectable } from '@angular/core';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';

@Injectable({
  providedIn: 'root',
})

//Retorna true se o input ja existe no DB
export class CheckDatabaseService {
  constructor() {}

  checkEmail(emailInput: string) {
    if(registeredUsersMock.find(({ email }) => email === emailInput)) return true;
    return false;
  }

  checkCpf(cpfInput: string) {
    if(registeredUsersMock.find(({ cpf }) => cpf === cpfInput)) return true;
    return false;
  }
}
