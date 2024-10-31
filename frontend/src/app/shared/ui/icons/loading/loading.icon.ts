import { Component, input } from '@angular/core';

@Component({
  selector: 'loading-icon',
  standalone: true,
  imports: [],
  templateUrl: './loading.icon.html',
  styleUrl: './loading.icon.scss',
  host: {
    '[style.width]': 'width()',
    '[style.fill]': 'color()',
    '[style.stroke]': 'color()',
  },
})
export class LoadingIcon {
  width = input<string>('32px');
  color = input<string>('#4E42FF');
}
