import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from '@/shared/card/card.component';
import { UserIcon } from '@/shared/icons/user.icon';
import { LockIcon } from '@/shared/icons/lock.icon';
import { InputComponent } from '@/shared/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, UserIcon, InputComponent, LockIcon, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isError = false;
  errorLog = '';
  formValues = signal({
    email: {
      value: '',
      error: false,
    },
    password: {
      value: '',
      error: false,
    },
  });

  onInputChange(fieldName: string, newValue: string) {
    this.formValues.update((currentValues) => ({
      ...currentValues,
      [fieldName]: {
        value: newValue,
      },
    }));
  }

  handleError() {
    if (this.formValues().email.value.length === 0) {
      this.formValues().email.error = true;
      this.isError = true;
      this.errorLog = 'Complete todos os campos';
    }

    if (this.formValues().password.value.length === 0) {
      this.formValues().password.error = true;
      this.isError = true;
      this.errorLog = 'Complete todos os campos';
    }

    if (this.isError) {
      return;
    }

    let emailMatch = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(this.formValues().email.value);

    if (!emailMatch) {
      this.formValues().email.error = true;
      this.isError = true;
      this.errorLog = 'E-mail incorreto';
      return;
    }
  }
  onSubmit() {
    this.isError = false;
    this.handleError();
    if (!this.isError) {
      console.log('form enviado:', this.formValues());

      this.formValues.update((currentValues) => ({
        ...currentValues,
        email: {
          value: '',
          error: false,
        },
        password: {
          value: '',
          error: false,
        },
      }));
    }
  }
}
