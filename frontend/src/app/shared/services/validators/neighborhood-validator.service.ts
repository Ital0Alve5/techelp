import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class NeighborhoodValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isNeighborhoodValid = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]{2,}$/).test(inputValue);

    if (!isNeighborhoodValid)
      return {
        error: true,
        message: 'Bairro inválido!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
