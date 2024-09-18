import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';
import { deviceCategories } from '@/features/request-maintenance/constants/device-categories.constant';

@Injectable()
export class DeviceCategoryValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
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
