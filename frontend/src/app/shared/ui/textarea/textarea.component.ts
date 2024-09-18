import { Component, input, model } from '@angular/core';

import { InputError } from '@/shared/types/input-error.type';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  value = model<string>('');

  placeholder = input<string>();
  id = input.required<string>();
  label = input<string>('');
  validation = input<InputError>();

  onInput($event: Event) {
    const inputValue = (<HTMLInputElement>$event.target).value;
    this.value.set(inputValue);
  }
}
