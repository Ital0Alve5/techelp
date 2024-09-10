import { Component, input, signal, model } from '@angular/core';
import { AllowVisibilityIcon } from '../icons/allow-visibility.icon';
import { BlockVisibilityIcon } from '../icons/block-visibility.icon';
import { InputError } from '@/shared/types/input-error.type';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [AllowVisibilityIcon, BlockVisibilityIcon],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  type = model<string>('text');
  value = model<string>('');

  placeholder = input<string>();
  id = input<string>();
  label = input<string>('ou');
  validation = input<InputError>();

  isHidden = signal<boolean>(true);

  onInput($event: Event) {
    this.value.set((<HTMLInputElement>$event.target).value);
  }

  toggleHidden(shouldBeHidden: boolean) {
    this.isHidden.set(shouldBeHidden);

    if (this.isHidden()) this.type.set('password');
    else this.type.set('text');
  }
}
