import { Component, input } from '@angular/core';

@Component({
  selector: 'add-icon',
  standalone: true,
  imports: [],
  templateUrl: './add.icon.html',
  styleUrl: './add.icon.scss',
  host: {
    '[style.width]': 'width()',
    '[style.fill]': 'color()',
  },
})
export class AddIcon {
  width = input<string>('16px');
  color = input<string>('#fff');
}
