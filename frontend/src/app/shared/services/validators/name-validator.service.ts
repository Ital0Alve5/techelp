import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class NameValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isAlphabetic = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(inputValue.replace(' ', ''));

    if (!isAlphabetic)
      return {
        error: true,
        message: 'Nome aceita apenas letras!',
      };
    else if (inputValue.indexOf(' ') === -1) {
      return {
        error: true,
        message: 'Deve ser o nome completo!',
      };
    } else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
