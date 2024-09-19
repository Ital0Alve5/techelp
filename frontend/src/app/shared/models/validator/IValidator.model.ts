import { InputError } from '@/shared/types/input-error.type';

export interface IValidator {
  setNext(validator: IValidator): IValidator;
  validate(value: string): InputError;
}
