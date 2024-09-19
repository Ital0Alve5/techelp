import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DebounceService {
  timer: ReturnType<typeof setTimeout> | null = null;

  setDebounce(miliseconds: number, callbackFunction: () => void): void {
    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(callbackFunction, miliseconds);
  }
}
