import { Injectable } from '@angular/core';
import axios from 'axios';

import { addressDataType } from '../types/address-data.type';

@Injectable()
export class CepService {
  async getAddressData(cep: string): addressDataType {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        return {
          error: true,
          message: 'CEP inválido!',
        };
      }

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
