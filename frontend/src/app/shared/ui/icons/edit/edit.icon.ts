import { Component, input } from '@angular/core';

@Component({
  selector: 'edit-icon',
  standalone: true,
  imports: [],
  templateUrl: './edit.icon.html',
  styleUrl: './edit.icon.scss',
  host: {
    '[style.width]': 'width()',
    '[style.fill]': 'color()',
  },
})
export class EditIcon {
  width = input<string>('16px');
  color = input<string>('#4d4d54');
}
