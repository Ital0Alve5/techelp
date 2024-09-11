import { Injectable } from '@angular/core';
import {
  EmailValidationService,
  MinLengthValidationService,
  MaxLengthValidationService,
  RequiredValidationService,
} from './validations.service';
import { Validation } from '@/shared/enums/validation.enum';
import { InputError } from '@/shared/types/input-error.type';

@Injectable()
export class ValidatorService {
  constructor(
    private emailValidationService: EmailValidationService,
    private minLengthValidationService: MinLengthValidationService,
    private maxLengthValidationService: MaxLengthValidationService,
    private requiredValidationService: RequiredValidationService,
  ) {}

  setValidation(
    inputValue: string,
    validation: Validation,
    {
      minLength,
      maxLength,
      fieldName,
    }: {
      minLength?: number;
      maxLength?: number;
      fieldName?: string;
    },
  ): InputError {
    switch (validation) {
      case Validation.Email:
        return this.validateEmail(inputValue);
      case Validation.Password:
        return this.validatePassword(inputValue, minLength, maxLength);
      case Validation.Required:
        return this.validateRequired(inputValue, fieldName);
      case Validation.MinLength:
        return this.validateMinLength(inputValue, minLength);
      case Validation.MaxLength:
        return this.validateMinLength(inputValue, maxLength);
    }
  }

  validateRequired(inputValue: string, fieldName: string | undefined) {
    if (fieldName) this.requiredValidationService.setFieldName(fieldName);
    return this.requiredValidationService.validate(inputValue);
  }

  validateEmail(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'E-mail');

    if (result.error) return result;

    result = this.emailValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateMinLength(inputValue: string, minLength: number | undefined) {
    if (minLength) this.minLengthValidationService.setMinLength(minLength);
    return this.minLengthValidationService.validate(inputValue);
  }

  validateMaxLength(inputValue: string, maxLength: number | undefined) {
    if (maxLength) this.maxLengthValidationService.setMaxLength(maxLength);
    return this.maxLengthValidationService.validate(inputValue);
  }

  validatePassword(inputValue: string, minLength: number | undefined, maxLength: number | undefined) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Senha');

    if (result.error) return result;

    result = this.validateMinLength(inputValue, minLength);

    if (result.error) return result;

    result = this.validateMaxLength(inputValue, maxLength);

    if (result.error) return result;

    return result;
  }
}
