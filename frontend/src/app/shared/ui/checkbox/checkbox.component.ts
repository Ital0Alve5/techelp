import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  id = input<string>('');
  value = input<boolean>(false);
  label = input<string>('');
  changeEvent = output<boolean>();

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this.changeEvent.emit(newValue);
  }
}
