import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userType: string | null = null;

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();

    if (!token) return from([false]);

    return from(
      axios.get<{ authenticated: boolean; userType?: string }>('http://localhost:8080/api/check-auth', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ).pipe(
      map((response: AxiosResponse<{ authenticated: boolean; userType?: string }>) => {
        if (response.data.authenticated) {
          this.userType = response.data.userType || null;
        } else {
          this.clearAuthData();
        }
        return response.data.authenticated;
      }),
    );
  }

  logout(): void {
    this.clearAuthData();
    window.location.href = '/login';
  }

  getUserType(): string | null {
    return this.userType;
  }

  setAuthData(token: string, userType: string): void {
    localStorage.setItem('token', token);
    this.userType = userType;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    this.userType = null;
  }

  isUserTypeAllowed(path: string): boolean {
    const userType = this.getUserType();

    if (path.startsWith('funcionario') && userType !== 'employee') return false;
    if (path.startsWith('cliente') && userType !== 'client') return false;
    return true;
  }
}
