import { Requests } from './requests.type';

export type UserData = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  requests: Requests[];
};
