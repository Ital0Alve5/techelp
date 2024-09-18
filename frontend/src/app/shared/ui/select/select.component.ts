import { Component, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputError } from '@/shared/types/input-error.type';
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  value = model<string>('');
  defaultValue = input.required<string>();

  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  options = input<{ value: string; label: string }[]>([]);
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
