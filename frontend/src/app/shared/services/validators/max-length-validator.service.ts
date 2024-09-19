import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class MaxLengthValidator extends BaseValidator {
  private maxLength: number = 12;

  setMaxLength(maxLength: number) {
    this.maxLength = maxLength;
  }

  override validate(inputValue: string): InputError {
    inputValue = super.sanitize(inputValue);

    if (inputValue.length > this.maxLength)
      return {
        error: true,
        message: `Máximo de ${this.maxLength} caracteres!`,
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
