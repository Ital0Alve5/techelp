import { Component, input, model, signal, SimpleChanges, OnChanges } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';
@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnChanges {
  value = model<string | number>('');

  textValue = signal('');
  id = input<string>('');
  label = input<string>('');
  placeholder = input.required<string>();
  options = input<({ id: number; [key: string]: unknown } & ({ name: string } | { label: string }))[]>([]);
  validation = input<InputError>();
  disabled = input<boolean>();
  isOpen = signal<boolean>(false);
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled']?.currentValue) this.isOpen.set(false);
  }

  toggleSelect() {
    if (this.disabled()) return;

    this.isOpen.set(!this.isOpen());
  }

  onOptionChosen(chosenOption: { [key: string]: unknown; id: number } & ({ name: string } | { label: string })) {
    this.value.set(chosenOption.id);

    if ('label' in chosenOption) this.textValue.set(chosenOption.label as string);
    else if ('name' in chosenOption) this.textValue.set(chosenOption.name as string);
  }
}
