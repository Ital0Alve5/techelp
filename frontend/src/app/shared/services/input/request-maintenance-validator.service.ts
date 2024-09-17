import { Injectable } from '@angular/core';
import {
  MinLengthValidationService,
  MaxLengthValidationService,
  RequiredValidationService,
} from './validations.service';
import { Validation } from '@/shared/enums/validation.enum';
import { InputError } from '@/shared/types/input-error.type';

@Injectable({ providedIn: 'root' })
export class RequestMaintenanceValidatorService {
  constructor(
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
      case Validation.Required:
        return this.validateRequired(inputValue, fieldName);
      case Validation.MinLength:
        return this.validateMinLength(inputValue, minLength);
      case Validation.MaxLength:
        return this.validateMaxLength(inputValue, maxLength);
      default:
        return { error: true, message: 'Tipo de campo desconhecido' };
    }
  }

  validateRequired(inputValue: string, fieldName: string | undefined) {
    if (fieldName) this.requiredValidationService.setFieldName(fieldName);
    return this.requiredValidationService.validate(inputValue);
  }

  validateMinLength(inputValue: string, minLength: number | undefined) {
    if (minLength) this.minLengthValidationService.setMinLength(minLength);
    return this.minLengthValidationService.validate(inputValue);
  }

  validateMaxLength(inputValue: string, maxLength: number | undefined) {
    if (maxLength) this.maxLengthValidationService.setMaxLength(maxLength);
    return this.maxLengthValidationService.validate(inputValue);
  }
}
