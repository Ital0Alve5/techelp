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
      this.popups = this.popups.filter((popupToBeRemoved) => {
        return Object.entries(popupToBeRemoved).sort().toString() !== Object.entries(popUp).sort().toString();
      });

    }, this.milisecondsActive);
  }

  getPopUpList() {
    return this.popups;
  }
}
