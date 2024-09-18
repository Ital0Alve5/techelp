import { Component, input, model, signal } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';
@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  value = model<string>('');
  defaultValue = input.required<string>();

  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  options = input<{ id: number; label: string }[]>([]);
  validation = input<InputError>();
  isOpen = signal<boolean>(false);

  toggleSelect() {
    this.isOpen.set(!this.isOpen());
  }

  onChange(event: Event) {
    this.value.set((event.target as HTMLSelectElement).value);
  }

  onOptionChosen(event: Event) {
    this.value.set((event.target as HTMLElement).innerText);
  }
}
