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
  formValues = signal({
    email: '',
    password: '',
  });

  onInputChange(fieldName: string, newValue: string) {
    this.formValues.update((currentValues) => ({
      ...currentValues,
      [fieldName]: newValue,
    }));
  }

  onSubmit() {
    console.log('form enviado:', this.formValues());

    this.formValues.update((currentValues) => ({
      ...currentValues,
      email: '',
      password: '',
    }));
  }
}
