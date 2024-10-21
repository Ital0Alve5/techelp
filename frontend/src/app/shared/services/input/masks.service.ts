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
    // Remove tudo que não seja número
    let numericValue = inputValue.replace(/\D/g, '');

    // Se for vazio, retorna R$ 0,00
    if (numericValue.length === 0) {
      return 'R$ 0,00';
    }

    // Garante que sempre haja pelo menos 3 dígitos (1 para a parte inteira e 2 para os centavos)
    while (numericValue.length < 3) {
      numericValue = '0' + numericValue;
    }

    // Adiciona os centavos (últimos dois dígitos)
    const cents = numericValue.slice(-2); // Os dois últimos são os centavos
    const integerPart = numericValue.slice(0, -2); // Parte inteira

    // Remove zeros à esquerda da parte inteira
    const integerPartWithoutLeadingZeros = integerPart.replace(/^0+/, '') || '0';

    // Formata a parte inteira com pontos de milhar
    const formattedIntegerPart = integerPartWithoutLeadingZeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retorna o valor final formatado como moeda (R$ X.XXX,XX)
    return `R$ ${formattedIntegerPart},${cents}`;
  }
}
