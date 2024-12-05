import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { BaseValidator } from '@/shared/models/validator/Validator.model';

@Injectable()
export class DateValidator extends BaseValidator {
  override validate(inputValue: string): InputError {
    inputValue = inputValue.replace(/\D/g, '');

    const day = inputValue.substring(0, 2);
    const month = inputValue.substring(2, 4);
    const year = inputValue.substring(4, 8);

    if (inputValue.length < 8) {
      return {
        error: true,
        message: 'Data inválida!',
      };
    }

    const dayNumber = parseInt(day, 10);
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (yearNumber < 1900 || yearNumber > new Date().getFullYear()) {
      return {
        error: true,
        message: 'Data inválida!',
      };
    }

    if (monthNumber < 1 || monthNumber > 12) {
      return {
        error: true,
        message: 'Data inválida!',
      };
    }

    if (!this.isValidDay(dayNumber, monthNumber, yearNumber)) {
      return {
        error: true,
        message: 'Data inválida!',
      };
    }

    else if (this.nextValidator) return this.nextValidator.validate(inputValue);

    return {
      error: false,
      message: '',
    };
  }

  isValidDay(day: number, month: number, year: number): boolean {
    const daysInMonth = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day > 0 && day <= daysInMonth[month - 1];
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
