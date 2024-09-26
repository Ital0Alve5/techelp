import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'link-as-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './link-as-button.component.html',
  styleUrl: './link-as-button.component.scss',
  host: {
    '[style.background-color]': 'backgroundColor()',
    '[style.color]': 'textColor()',
  },
})
export class LinkAsButtonComponent {
  backgroundColor = input<string>('#4e42ff');
  textColor = input<string>('#ffffff');
  href = input.required<string>();
}
