import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';
import { deviceCategories } from '@/shared/mock/device-categories.mock';

@Injectable()
export class DeviceCategoryValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    if (inputValue !== 'string')
      return {
        error: false,
        message: '',
      };

    inputValue = inputValue.trim();

    const isCategoryValid = deviceCategories.find((categories) => {
      return categories.label === inputValue;
    });

    if (!isCategoryValid)
      return {
        error: true,
        message: 'Categoria inválida!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
