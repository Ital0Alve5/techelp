import { Component, input, signal, model, output } from '@angular/core';

import { AllowVisibilityIcon } from '@/shared/ui/icons/allow-visibility.icon';
import { BlockVisibilityIcon } from '@/shared/ui/icons/block-visibility.icon';

import { MaskApplicator } from '@/shared/services/input/mask-applicator.service';

import { InputError } from '@/shared/types/input-error.type';
import { Mask } from '@/shared/enums/mask.enum';

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
  id = input.required<string>();
  label = input<string>('');
  validation = input<InputError>();
  mask = input<Mask>();
  disabled = input<boolean>();
  inputEvent = output<string>();

  isHidden = signal<boolean>(true);

  constructor(private maskApplicator: MaskApplicator) {}

  onInput($event: Event) {
    const inputValue = (<HTMLInputElement>$event.target).value;

    if (this.mask() !== undefined) this.applyMask(inputValue);
    else this.value.set(inputValue);

    (<HTMLInputElement>$event.target).value = this.value();

    this.inputEvent.emit(this.value());
  }

  toggleHidden(shouldBeHidden: boolean) {
    this.isHidden.set(shouldBeHidden);

    if (this.isHidden()) this.type.set('password');
    else this.type.set('text');
  }

  applyMask(value: string) {
    this.value.set(this.maskApplicator.applyMask(value, this.mask()!));
  }
}
