import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() options: { value: string, label: string }[] = [];
  @Input() value: string = '';

  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
  }
}
