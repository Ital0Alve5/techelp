import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Authenticator {
  private isAuthenticated: boolean = true;
  private isEmployee: boolean = false;

  checkAuthentication(isEmployee: boolean) {
    if (!isEmployee) return this.isAuthenticated;

    return this.isAuthenticated && this.isEmployee;
  }

  setIsEmployee(isEmployee: boolean) {
    this.isEmployee = isEmployee;
  }

  getIsEmployee() {
    return this.isEmployee;
  }

  authenticate(auth: boolean) {
    return (this.isAuthenticated = auth);
  }
}
