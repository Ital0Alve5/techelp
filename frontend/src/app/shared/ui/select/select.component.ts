import { Component, input, model } from '@angular/core';
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
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  options = input<{ value: string; label: string }[]>([]);
  value = model<string>('');
  validation = input<InputError>();

  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.value.set(selectElement.value);
  }
}
