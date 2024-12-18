import { Injectable } from '@angular/core';
import {
  CpfMaskService,
  PhoneMaskService,
  CepMaskService,
  CurrencyMaskService,
  DateMaskService,
} from './masks.service';
import { Mask } from '@/shared/enums/mask.enum';

@Injectable({ providedIn: 'root' })
export class MaskApplicator {
  constructor(
    private cpfMaskService: CpfMaskService,
    private phoneMaskService: PhoneMaskService,
    private cepMaskService: CepMaskService,
    private currencyMaskService: CurrencyMaskService,
    private dateMaskService: DateMaskService,
  ) {}

  applyMask(inputValue: string, mask: Mask): string {
    switch (mask) {
      case Mask.Cpf:
        return this.cpfMaskService.apply(inputValue);
      case Mask.Phone:
        return this.phoneMaskService.apply(inputValue);
      case Mask.Cep:
        return this.cepMaskService.apply(inputValue);
      case Mask.Currency:
        return this.currencyMaskService.apply(inputValue);
      case Mask.Date:
        return this.dateMaskService.apply(inputValue);
    }
  }
}
