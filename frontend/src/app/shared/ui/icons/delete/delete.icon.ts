import { Component, input } from '@angular/core';

@Component({
  selector: 'delete-icon',
  standalone: true,
  imports: [],
  templateUrl: './delete.icon.html',
  styleUrl: './delete.icon.scss',
  host: {
    '[style.width]': 'width()',
    '[style.fill]': 'color()',
  },
})
export class DeleteIcon {
  width = input<string>('16px');
  color = input<string>('#4d4d54');
}
