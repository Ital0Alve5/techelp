import { Injectable } from '@angular/core';
import { InputMaskModel } from '@/shared/models/input-mask.model';

@Injectable({ providedIn: 'root' })
export class CpfMaskService extends InputMaskModel {
  constructor() {
    super();
  }

  override apply(inputValue: string): string {
    const numeric = inputValue.trim().replace(/[^0-9]+/g, '');
    const cpfLength = numeric.length;

    const firstPart = numeric.slice(0, 3) + '.';
    const secondPart = numeric.slice(3, 6) + '.';
    const thirdPart = numeric.slice(6, 9) + '-';

    if (cpfLength < 4) return numeric;
    else if (cpfLength >= 4 && cpfLength < 7) return firstPart + numeric.slice(3);
    else if (cpfLength >= 7 && cpfLength < 10) return firstPart + secondPart + numeric.slice(6);
    else if (cpfLength >= 10 && cpfLength < 12) return firstPart + secondPart + thirdPart + numeric.slice(9);
    else if (cpfLength >= 12) return firstPart + secondPart + thirdPart + numeric.slice(9, 11);
    return '';
  }
}

@Injectable({ providedIn: 'root' })
export class PhoneMaskService extends InputMaskModel {
  constructor() {
    super();
  }

  override apply(inputValue: string): string {
    let cleanedValue = inputValue.replace(/\D/g, '');
    cleanedValue = cleanedValue.replace(/^0/, '');

    if (cleanedValue.length > 11) {
      cleanedValue = cleanedValue.substring(0, 11);
    }

    if (cleanedValue.length === 0) {
      return '';
    } else if (cleanedValue.length > 10) {
      return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (cleanedValue.length > 6) {
      return cleanedValue.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (cleanedValue.length > 2) {
      return cleanedValue.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else {
      return cleanedValue.replace(/^(\d*)$/, '($1');
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CepMaskService extends InputMaskModel {
  constructor() {
    super();
  }

  override apply(inputValue: string): string {
    return inputValue
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  }
}

@Injectable({ providedIn: 'root' })
export class CurrencyMaskService extends InputMaskModel {
  constructor() {
    super();
  }

  override apply(inputValue: string): string {
    let numericValue = inputValue.replace(/\D/g, '');

    if (numericValue.length === 0) {
      return 'R$ 0,00';
    }

    while (numericValue.length < 3) {
      numericValue = '0' + numericValue;
    }

    const cents = numericValue.slice(-2);
    const integerPart = numericValue.slice(0, -2);

    const integerPartWithoutLeadingZeros = integerPart.replace(/^0+/, '') || '0';

    const formattedIntegerPart = integerPartWithoutLeadingZeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${formattedIntegerPart},${cents}`;
  }
}

@Injectable({ providedIn: 'root' })
export class DateMaskService extends InputMaskModel {
  constructor() {
    super();
  }

  override apply(inputValue: string): string {
    inputValue = inputValue.replace(/\D/g, '');

    const day = inputValue.substring(0, 2);
    const month = inputValue.substring(2, 4);
    const year = inputValue.substring(4, 8);

    if (inputValue.length > 2 && inputValue.length <= 4) inputValue = day + '/' + month;
    else if (inputValue.length > 4) inputValue = day + '/' + month + '/' + year;

    return inputValue;
  }
}
