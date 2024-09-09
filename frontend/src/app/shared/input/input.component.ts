import { Component, input, output, signal } from '@angular/core';
import { AllowVisibilityIcon } from '../icons/allow-visibility.icon';
import { BlockVisibilityIcon } from '../icons/block-visibility.icon';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [AllowVisibilityIcon, BlockVisibilityIcon],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  placeholder = input<string>();
  type = input<string>('text');
  value = input<string>();
  valueChange = output<string>();
  isError = input<boolean>(false);
  isHidden = signal<boolean>(true);
  variableType = signal(this.type());

  ngOnInit() {
    this.variableType.set(this.type());
  }

  onInput($event: Event) {
    const value = (<HTMLInputElement>$event.target).value;

    this.valueChange.emit(value);
  }

  toggleHidden(shouldBeHidden: boolean) {
    this.isHidden.set(shouldBeHidden);

    if (this.isHidden()) this.variableType.set('password');
    else this.variableType.set('text');
  }
}
