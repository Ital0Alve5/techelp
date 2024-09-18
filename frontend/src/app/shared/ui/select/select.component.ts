import { Component, input, model, signal, SimpleChanges, OnChanges } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';
@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnChanges {
  value = model<string>('');

  id = input<string>('');
  label = input<string>('');
  placeholder = input.required<string>();
  options = input<{ id: number; label: string }[]>([]);
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

  onChange(event: Event) {
    this.value.set((event.target as HTMLSelectElement).value);
  }

  onOptionChosen(event: Event) {
    this.value.set((event.target as HTMLElement).innerText);
  }
}
