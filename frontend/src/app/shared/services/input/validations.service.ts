import { Injectable } from '@angular/core';
import { InputValidator } from '@/shared/models/input-validator.model';
import { InputError } from '@/shared/types/input-error.type';

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
