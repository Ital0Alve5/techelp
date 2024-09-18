import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class HouseNumberValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isHouseNumberValid = /^[0-9]+[A-Z]?[0-9]*[-/]*[A-Z0-9]*$/.test(inputValue);

    if (!isHouseNumberValid)
      return {
        error: true,
        message: 'Número da casa inválido!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
