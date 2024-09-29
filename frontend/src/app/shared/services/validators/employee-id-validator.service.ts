import { BaseValidator } from '@/shared/models/validator/Validator.model';
import { InputError } from '@/shared/types/input-error.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIDValidator extends BaseValidator {
  override validate(value: string): InputError {
    value = value.trim();
    const employeeIdMatch = /^(0|[1-9][0-9]*)$/.test(value);
    console.log(employeeIdMatch);

    if (!employeeIdMatch)
      return {
        error: true,
        message: 'Registro de funcionário inválido!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(value);

    return {
      error: false,
      message: '',
    };
  }
}
