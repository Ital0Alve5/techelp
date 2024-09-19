import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class CityValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isCityValid = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ'´ ]{2,}$/).test(inputValue);

    if (!isCityValid)
      return {
        error: true,
        message: 'Cidade inválida!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
