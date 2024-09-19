import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class UfValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const isValidUf = /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/.test(
      inputValue,
    );

    if (!isValidUf)
      return {
        error: true,
        message: 'UF deve existir!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
