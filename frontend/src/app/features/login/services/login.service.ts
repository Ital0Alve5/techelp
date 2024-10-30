import { Injectable } from '@angular/core';
import { InputError } from '@/shared/types/input-error.type';
import { Response } from '@/shared/types/api/response.type';

@Injectable()
export class LoginService {
  private apiUrl = '/login';

  constructor() {}

  async checkRegisteredUsers(emailInput: string, passwordInput: string): Promise<number | null> {
    const loginData = { email: emailInput, password: passwordInput };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const userId: number = await response.json();
      return userId !== 0 ? userId : null;
    } catch (error) {
      console.error('Erro ao verificar usuário registrado:', error);
      return null;
    }
  }

  async checkRegisteredEmployee(emailInput: string, passwordInput: string): Promise<number | null> {
    const loginData = { email: emailInput, password: passwordInput };

    try {
      const response = await fetch(`${this.apiUrl}/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const userId: number = await response.json();
      return userId !== 0 ? userId : null;
    } catch (error) {
      console.error('Erro ao verificar funcionário registrado:', error);
      return null;
    }
  }

  async validate(
    data: { email: string; password: string },
    isEmployee?: boolean,
  ): Promise<Response<InputError> | Response<{ userId: number }>> {
    let userId: number | null;

    if (isEmployee) {
      userId = await this.checkRegisteredEmployee(data.email, data.password);
    } else {
      userId = await this.checkRegisteredUsers(data.email, data.password);
    }

    return new Promise((resolve) => {
      if (userId === null) {
        resolve({
          error: true,
          data: {
            error: true,
            message: 'Dados inválidos',
          },
        });
        return;
      }

      localStorage.setItem('userId', userId.toString());
      resolve({
        error: false,
        data: { userId },
      });
    });
  }
}
