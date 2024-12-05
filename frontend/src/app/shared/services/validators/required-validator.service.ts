import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class RequiredValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    if (typeof inputValue === 'string') inputValue = super.sanitize(inputValue);

    if (inputValue.length === 0)
      return {
        error: true,
        message: 'O campo é obrigatório!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
