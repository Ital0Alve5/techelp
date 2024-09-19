import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class NumericValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isNumeric = /^\d+$/.test(inputValue);

    if (!isNumeric)
      return {
        error: true,
        message: 'O campo aceita apenas números!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
