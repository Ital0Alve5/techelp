import { Component, signal } from '@angular/core';

import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { Mask } from '@/shared/enums/mask.enum';
import { CepService } from './services/cep.service';
import { DebounceService } from '@/shared/services/utils/debounce.service';
@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [ModalComponent, CardComponent, AuthTypeComponent, InputComponent, ButtonComponent, UserIcon, LockIcon],
  providers: [CepService],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent {
  successModal = false;
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
    redefinePassword: {
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
      mask: Mask.Cpf,
    },
    phone: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
      mask: Mask.Phone,
    },
    cep: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
      mask: Mask.Cep,
    },
    state: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    city: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    neighborhood: {
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
      type: 'text',
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
  passValues = signal(
    {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    }
    );
  constructor(
    private cepService: CepService,
    private debounceService: DebounceService,
  ) {}

  setAddressUsingCep(cep: string) {
    if (cep.replace(/[^0-9]/g, '').length < 8) {
      this.cleanAddressFields();
      this.clearCepError();
      return;
    }

    this.debounceService.setDebounce(800, async () => {
      const response = await this.cepService.getAddressData(cep);

      if ('data' in response) {
        this.formValues().state.value = response.data.uf;
        this.formValues().city.value = response.data.localidade;
        this.formValues().neighborhood.value = response.data.bairro;
        this.formValues().street.value = response.data.logradouro;

        this.clearCepError();
      } else {
        this.cleanAddressFields();
        this.formValues().cep.validation = response;
      }
    });
  }

  cleanAddressFields() {
    this.formValues().state.value = '';
    this.formValues().city.value = '';
    this.formValues().neighborhood.value = '';
    this.formValues().street.value = '';
  }

  clearCepError() {
    this.formValues().cep.validation = { error: false, message: '' };
  }

  onSubmit() {
    console.log(this.formValues());
    this.successModal = true;
  }

  confirmPassword(){
    console.log(this.passValues());
    this.successModal = false;
  }
}
