import { InputError } from '@/shared/types/input-error.type';

export abstract class InputValidator {
  abstract validate(inputValue: string): InputError;

  sanitize(inputValue: string): string {
    return inputValue.replace(/\s{2,}/g, ' ').trim();
  }
}
