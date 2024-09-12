import { Component, signal } from '@angular/core';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CardComponent, AuthTypeComponent, InputComponent, ButtonComponent, UserIcon, LockIcon],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent {
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
    name: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    cpf: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    phone: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    cep: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    street: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    number: {
      value: '',
      type: 'number',
      validation: {
        error: false,
        message: '',
      },
    },
    complement: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
  });
}
