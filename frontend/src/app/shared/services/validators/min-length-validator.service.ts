import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class MinLengthValidator extends BaseValidator {
  private minLength: number = 4;

  setMinLength(minLength: number) {
    this.minLength = minLength;
  }

  override validate(inputValue: string): InputError {
    inputValue = super.sanitize(inputValue);

    console.log(inputValue.length < this.minLength);

    if (inputValue.length < this.minLength)
      return {
        error: true,
        message: `Mínimo de ${this.minLength} caracteres!`,
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
