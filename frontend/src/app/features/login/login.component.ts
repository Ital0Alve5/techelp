import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { EmailValidator } from '@/shared/services/validators/email-validator.service';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MaxLengthValidator } from '@/shared/services/validators/max-length-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { formData } from './model/form-data.model';
import { LoginService } from './services/login.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
import { InputError } from '@/shared/types/input-error.type';
import { UserData } from '@/shared/types/user-data.type';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, UserIcon, InputComponent, LockIcon, FormsModule, AuthTypeComponent, ButtonComponent],
  providers: [EmailValidator, RequiredValidator, MaxLengthValidator, MinLengthValidator, LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formValues = signal(JSON.parse(JSON.stringify(formData)));

  constructor(
    private emailValidator: EmailValidator,
    private requiredValidator: RequiredValidator,
    private maxLengthValidator: MaxLengthValidator,
    private minLengthValidator: MinLengthValidator,
    private loginService: LoginService,
    private popupService: PopupService,
    private router: Router,
  ) {}

  resetInputs() {
    this.formValues.update(() => JSON.parse(JSON.stringify(formData)));
  }

  sendData() {
    this.loginService
      .validate({
        email: this.formValues().email.value,
        password: this.formValues().password.value,
      })
      .then((response) => {
        if (response.error) {
          this.popupService.addNewPopUp({
            type: Status.Error,
            message: (response.data as InputError).message,
          });
        } else {
          this.router.navigate([`/cliente/${(response.data as UserData).id}/solicitacoes`]);
        }
      });
  }

  onSubmit() {
    const { email, password } = this.formValues();

    this.requiredValidator.setNext(this.emailValidator);
    this.formValues().email.validation = this.requiredValidator.validate(email.value);

    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().password.validation = this.requiredValidator.validate(password.value);

    if (!email.validation.error && !password.validation.error) this.sendData();
  }
}
