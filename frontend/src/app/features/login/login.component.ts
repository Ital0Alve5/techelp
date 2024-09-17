import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { InputComponent } from '@/shared/ui/input/input.component';
import { LoginValidatorService } from '@/shared/services/input/login-validator.service';
import { Validation } from '@/shared/enums/validation.enum';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CheckDatabaseService } from '@/shared/services/input/check-database.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, UserIcon, InputComponent, LockIcon, FormsModule, AuthTypeComponent, ButtonComponent],
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

  constructor(private loginValidatorService: LoginValidatorService) {}

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
    const emailValidation = this.loginValidatorService.setValidation(
      this.formValues().email.value,
      Validation.Email,
      {},
    );

    const passwordValidation = this.loginValidatorService.setValidation(
      this.formValues().password.value,
      Validation.Password,
      { maxLength: 12, minLength: 4 },
    );

    this.formValues().email.validation = emailValidation;

    this.formValues().password.validation = passwordValidation;

    if (!emailValidation.error && !passwordValidation.error) {
      this.sendData();
      this.resetInputs();
    }
  }
}
