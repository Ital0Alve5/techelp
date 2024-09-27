import { Injectable } from '@angular/core';
import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
import { Client } from '@/shared/types/client.type';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {



  getClientById(userId: number): Client | undefined {
    const userFound = registeredUsersMock.find(({ id }) => id === userId);
    return userFound;
  }
}
