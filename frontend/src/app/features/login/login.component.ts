import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { EmailValidator } from '@/shared/services/validators/email-validator.service';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MaxLengthValidator } from '@/shared/services/validators/max-length-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';

import { LoginService } from './services/login.service';
import { formData } from './model/form-data.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardComponent,
    UserIcon,
    InputComponent,
    LockIcon,
    FormsModule,
    AuthTypeComponent,
    ButtonComponent,
    RouterLink,
  ],
  providers: [EmailValidator, RequiredValidator, MaxLengthValidator, MinLengthValidator, LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formValues = signal(JSON.parse(JSON.stringify(formData)));
  isEmployeeLogin = location.pathname === '/funcionario/login';

  constructor(
    private emailValidator: EmailValidator,
    private requiredValidator: RequiredValidator,
    private maxLengthValidator: MaxLengthValidator,
    private minLengthValidator: MinLengthValidator,
    private loginService: LoginService,
    private popupService: PopupService,
    private router: Router,
  ) {}

  async sendData() {
    const success = await this.loginService.validate(
      {
        email: this.formValues().email.value,
        password: this.formValues().password.value,
      },
      this.isEmployeeLogin,
    );

    if (!success?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in success.data) {
      Object.values(success.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: success.data.message,
    });

    this.router.navigate([
      `/${this.isEmployeeLogin ? 'funcionario' : 'cliente'}/solicitacoes`,
    ]);
  }

  onSubmit() {
    const { email, password } = this.formValues();

    this.requiredValidator.setNext(this.emailValidator);
    this.formValues().email.validation = this.requiredValidator.validate(email.value);

    this.maxLengthValidator.setMaxLength(4);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().password.validation = this.requiredValidator.validate(password.value);

    if (!this.isEmployeeLogin) {
      if (!email.validation.error && !password.validation.error) this.sendData();
      return;
    }

    if (!email.validation.error && !password.validation.error) this.sendData();
  }
}
