import { Injectable } from '@angular/core';
import axios from 'axios';

import { InputError } from '@/shared/types/input-error.type';
import { Viacep } from '../types/viacep.type';

type adressDataType = Promise<
  | {
      error: boolean;
      data: Viacep;
    }
  | InputError
>;

@Injectable()
export class CepService {
  async getAddressData(cep: string): adressDataType {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data)
      if (response.data.erro)
        return {
          error: true,
          message: 'CEP inválido!',
        };

      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        message: 'Serviço de CEP indisponível!',
      };
    }
  }
}
