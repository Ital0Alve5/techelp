import { Component, input } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[style.background-color]': 'hovered ? hoverColor() : backgroundColor()',
    '[style.color]': 'textColor()',
  },
})
export class ButtonComponent {
  public hovered : boolean = false;
  backgroundColor = input<string>('#4e42ff');
  textColor = input<string>('#ffffff');
  hoverColor = input<string>('purple-hover');
}
