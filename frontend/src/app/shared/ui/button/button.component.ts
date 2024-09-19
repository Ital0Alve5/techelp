import { Component, input } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[style.background-color]': 'backgroundColor()',
    '[style.color]': 'textColor()',
  },
})
export class ButtonComponent {
  backgroundColor = input<string>('#4e42ff');
  textColor = input<string>('#ffffff');
}
