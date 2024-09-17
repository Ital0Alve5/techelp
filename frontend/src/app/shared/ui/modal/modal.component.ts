import { Component, model } from '@angular/core';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  host: {
    '(click)':'onClick($event)'
  }
})
export class ModalComponent {
  isHidden = model.required<boolean>();

  close() {
    this.isHidden.set(true);
  }

  onClick(event: KeyboardEvent) {
    if (!this.isHidden()) {
      const targetElement = event.target as Element;
      if (targetElement.className === 'outside-modal') {
        this.isHidden.set(true);
      }
    }
  }
}
