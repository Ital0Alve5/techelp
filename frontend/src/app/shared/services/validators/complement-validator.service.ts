import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class ComplementValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isComplementValid = new RegExp(/^[A-Za-z0-9,.:\-'" ]*$/).test(inputValue);

    if (!isComplementValid)
      return {
        error: true,
        message: 'Complemento inválido!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
