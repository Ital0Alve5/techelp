import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class CpfValidator extends BaseValidator {
  isValidCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);
    const calculateChecksum = (digits: number[], weight: number[]): number => {
      let sum = 0;
      for (let i = 0; i < weight.length; i++) {
        sum += digits[i] * weight[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstWeight = Array.from({ length: 9 }, (_, i) => 10 - i);
    const firstDigit = calculateChecksum(digits, firstWeight);
    if (digits[9] !== firstDigit) return false;

    const secondWeight = Array.from({ length: 10 }, (_, i) => 11 - i);
    const secondDigit = calculateChecksum(digits, secondWeight);
    if (digits[10] !== secondDigit) return false;

    return true;
  }

  override validate(inputValue: string): InputError {
    inputValue = inputValue.trim();

    const ValidCpf = this.isValidCpf(inputValue);

    if (!ValidCpf)
      return {
        error: true,
        message: 'CPF inválido!',
      };
    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }
}
