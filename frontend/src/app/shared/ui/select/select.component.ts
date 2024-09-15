import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  id = input<string>(''); // input() substitui o @Input()
  label = input<string>(''); // input() substitui o @Input()
  placeholder = input<string>(''); // input() substitui o @Input()
  options = input<{ value: string, label: string }[]>([]); // Usando input() para a lista de opções
  value = signal<string>(''); // signal() para manter o estado do valor selecionado

  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.value.set(selectElement.value); // Atualiza o signal com o valor selecionado
  }
}
