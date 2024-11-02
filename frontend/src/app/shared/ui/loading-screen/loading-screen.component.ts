import { Component, input } from '@angular/core';

import { LoadingIcon } from '../icons/loading/loading.icon';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [LoadingIcon],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
  host: {
    '[style.display]': 'isHidden() ? "none" : "flex"',
  },
})
export class LoadingScreenComponent {
  isHidden = input.required<boolean>();
}
