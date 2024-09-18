import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class StreetValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isStreetValid = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]{2,}$/).test(inputValue);

    if (!isStreetValid)
      return {
        error: true,
        message: 'Rua inválida!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
