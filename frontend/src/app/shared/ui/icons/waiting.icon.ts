import { Component, input } from '@angular/core';
@Component({
  selector: 'waiting-icon',
  standalone: true,
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path
        d="M0 24C0 10.7 10.7 0 24 0L360 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 19c0 40.3-16 79-44.5 107.5L225.9 256l81.5 81.5C336 366 352 404.7 352 445l0 19 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l8 0 0-19c0-40.3 16-79 44.5-107.5L158.1 256 76.5 174.5C48 146 32 107.3 32 67l0-19-8 0C10.7 48 0 37.3 0 24zM110.5 371.5c-3.9 3.9-7.5 8.1-10.7 12.5l184.4 0c-3.2-4.4-6.8-8.6-10.7-12.5L192 289.9l-81.5 81.5zM284.2 128C297 110.4 304 89 304 67l0-19L80 48l0 19c0 22.1 7 43.4 19.8 61l184.4 0z"
      />
    </svg>
  `,
  host: {
    '[style.width]': 'width()',
    '[style.fill]': 'color()',
  },
})
export class WaitingIcon {
  width = input.required<string>();
  color = input.required<string>();
}