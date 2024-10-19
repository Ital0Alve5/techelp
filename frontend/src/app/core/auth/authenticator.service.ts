import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Authenticator {
  private isAuthenticated: boolean = true;

  checkAuthentication() {
    return this.isAuthenticated;
  }

  authenticate(auth: boolean) {
    return (this.isAuthenticated = auth);
  }
}
