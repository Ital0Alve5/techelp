import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConverterService {
  
    convertFloatToCurrency(value: number): string {
        return value.toFixed(2).replace('.', ',');
    }
}
