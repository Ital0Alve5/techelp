import { Component, model, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  host: {
    '(click)':'onClick($event)'
  }
})
export class ModalComponent {
  isHidden = model<boolean>();
  close() {
    this.isHidden.set(true);
    console.log(this.isHidden());
  }

  onClick(event: KeyboardEvent) {
    if (!this.isHidden()) {
      const targetElement = event.target as Element;
      if (targetElement.className === 'outside-modal') {
        this.isHidden.set(true);
        console.log(this.isHidden());
      }
    }
  }
}
