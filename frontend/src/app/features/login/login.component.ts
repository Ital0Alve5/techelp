import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from '@/shared/ui/card/card.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ValidatorService } from '@/shared/services/input/validator.service';
import { Validation } from '@/shared/enums/validation.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, UserIcon, InputComponent, LockIcon, FormsModule],
  providers: [ValidatorService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formValues = signal({
    email: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    password: {
      value: '',
      type: 'password',
      validation: {
        error: false,
        message: '',
      },
    },
  });

  constructor(private validatorService: ValidatorService) {}

  onInputChange(fieldName: string, newValue: string) {
    this.formValues.update((currentValues) => ({
      ...currentValues,
      [fieldName]: {
        value: newValue,
      },
    }));
  }

  resetInputs() {
    this.formValues.update((currentValues) => ({
      ...currentValues,
      email: {
        value: '',
        type: 'text',
        validation: {
          error: false,
          message: '',
        },
      },
      password: {
        value: '',
        type: 'password',
        validation: {
          error: false,
          message: '',
        },
      },
    }));
  }

  sendData() {
    console.log({
      email: this.formValues().email.value,
      password: this.formValues().password.value,
    });
  }

  onSubmit() {
    const emailValidation = this.validatorService.setValidation(this.formValues().email.value, Validation.Email, {});

    const passwordValidation = this.validatorService.setValidation(
      this.formValues().password.value,
      Validation.Password,
      { maxLength: 12, minLength: 6 },
    );

    this.formValues().email.validation = emailValidation;

    this.formValues().password.validation = passwordValidation;

    if (!emailValidation.error && !passwordValidation.error) {
      this.sendData();
      this.resetInputs();
    }
  }
}
