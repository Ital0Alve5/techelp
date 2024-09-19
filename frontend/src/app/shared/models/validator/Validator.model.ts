import { IValidator } from './IValidator.model';
import { InputError } from '@/shared/types/input-error.type';

export abstract class BaseValidator implements IValidator {
  protected nextValidator: IValidator | null = null;

  sanitize(inputValue: string): string {
    return inputValue.replace(/\s{2,}/g, ' ').trim();
  }

  setNext(validator: IValidator): IValidator {
    this.nextValidator = validator;
    
    return validator;
  }

  validate(value: string): InputError {
    if (this.nextValidator) return this.nextValidator.validate(value);

    return {
      error: false,
      message: '',
    };
  }
}
