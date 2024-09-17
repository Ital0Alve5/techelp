import { Injectable } from '@angular/core';
import { InputValidator } from '@/shared/models/input-validator.model';
import { InputError } from '@/shared/types/input-error.type';
import { CheckDatabaseService } from './check-database.service';

@Injectable({ providedIn: 'root' })
export class EmailValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const emailMatch = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(inputValue);

    if (emailMatch)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'E-mail inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class MinLengthValidationService extends InputValidator {
  minLength: number | undefined = undefined;

  constructor() {
    super();
  }

  setMinLength(minLength: number) {
    this.minLength = minLength;
  }

  override validate(inputValue: string): InputError {
    if (!this.minLength) throw TypeError('minLength not specified');

    inputValue = super.sanitize(inputValue);

    if (inputValue.length >= this.minLength)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: `Mínimo de ${this.minLength} caracteres!`,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class MaxLengthValidationService extends InputValidator {
  maxLength: number | undefined = undefined;

  constructor() {
    super();
  }

  setMaxLength(maxLength: number) {
    this.maxLength = maxLength;
  }

  override validate(inputValue: string): InputError {
    if (!this.maxLength) throw TypeError('maxLength not specified');

    inputValue = super.sanitize(inputValue);

    if (inputValue.length <= this.maxLength)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: `Máximo de ${this.maxLength} caracteres!`,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class RequiredValidationService extends InputValidator {
  fieldName: string | undefined = undefined;

  constructor() {
    super();
  }

  setFieldName(fieldName: string) {
    this.fieldName = fieldName;
  }

  override validate(inputValue: string): InputError {
    if (!this.fieldName) throw TypeError('fieldName not specified');

    inputValue = super.sanitize(inputValue);

    if (inputValue.length > 0)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: `${this.fieldName} é obrigatório!`,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class CheckEmailLoginValidationService extends InputValidator {
  constructor(private checkDatabaseService: CheckDatabaseService) {
    super();
  }
  override validate(inputValue: string): InputError {
    if (!this.checkDatabaseService.checkEmail(inputValue)) {
      return {
        error: true,
        message: `E-mail não cadastrado`,
      };
    } else {
      return {
        error: false,
        message: '',
      };
    }
  }
}

@Injectable({ providedIn: 'root' })
export class NameValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isAlphabetic = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(inputValue.replace(' ', ''));

    if (!isAlphabetic)
      return {
        error: true,
        message: 'Nome aceita apenas letras!',
      };

    if (inputValue.indexOf(' ') === -1) {
      return {
        error: true,
        message: 'Deve ser o nome completo!',
      };
    }

    return {
      error: false,
      message: '',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class CPFValidationService extends InputValidator {
  constructor() {
    super();
  }

  isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);
    const calculateChecksum = (digits: number[], weight: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weight.length; i++) {
        sum += digits[i] * weight[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstWeight = Array.from({ length: 9 }, (_, i) => 10 - i);
    const firstDigit = calculateChecksum(digits, firstWeight);
    if (digits[9] !== firstDigit) return false;

    const secondWeight = Array.from({ length: 10 }, (_, i) => 11 - i);
    const secondDigit = calculateChecksum(digits, secondWeight);
    if (digits[10] !== secondDigit) return false;

    return true;
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const ValidCPF = this.isValidCPF(inputValue);

    if (ValidCPF)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'CPF inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class PhoneValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const phoneMatch = new RegExp(/^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}$/).test(inputValue);

    if (phoneMatch)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'Telefone inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class HouseNumberValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const houseNumber = new RegExp(/^[0-9]+[A-Z]?[0-9]*[-/]*[A-Z0-9]*$/).test(inputValue);

    if (houseNumber)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'Número inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class ComplementValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    let complement = new RegExp(/^[A-Za-z0-9,.:\-'" ]*$/).test(inputValue);

    if (!complement)
      return {
        error: true,
        message: 'Complemento inválido!',
      };

    complement = inputValue.length > 200 ? false : true;

    if (!complement)
      return {
        error: true,
        message: 'Complemento deve ter menos de 200 caracteres!',
      };

    return {
      error: false,
      message: '',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class CEPValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const cepNumber = new RegExp(/^\d{5}-?\d{3}$/).test(inputValue);

    if (cepNumber)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'CEP inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class RuaValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const rua = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]{2,}$/).test(inputValue);

    if (rua)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'Nome de rua inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class BairroValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const bairro = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]{2,}$/).test(inputValue);

    if (bairro)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'Bairro inválido!',
    };
  }
}

@Injectable({ providedIn: 'root' })
export class CidadeValidationService extends InputValidator {
  constructor() {
    super();
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const cidade = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ'´ ]{2,}$/).test(inputValue);

    if (cidade)
      return {
        error: false,
        message: '',
      };

    return {
      error: true,
      message: 'Cidade inválida!',
    };
  }
}
