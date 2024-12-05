import { Injectable } from '@angular/core';
import { PopUp } from '@/shared/types/pop-up.type';

@Injectable({ providedIn: 'root' })
export class PopupService {
  private popups: PopUp[] = [];
  private milisecondsActive: number = 4000;

  addNewPopUp(popUp: PopUp): void {
    this.popups.push(popUp);

    this.removePopUpAfterSomeTime(popUp);
  }

  removePopUpAfterSomeTime(popUp: PopUp) {
    setTimeout(() => {
      const index = this.popups.indexOf(popUp);
      if (index !== -1) {
        this.popups.splice(index, 1);
      }
    }, this.milisecondsActive);
  }

  getPopUpList() {
    return this.popups;
  }
}
