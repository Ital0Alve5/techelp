import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { Mask } from '@/shared/enums/mask.enum';
import { CepService } from './services/cep.service';
import { SignupValidatorService } from '@/shared/services/input/signup-validator.service';
import { Validation } from '@/shared/enums/validation.enum';
import { DebounceService } from '@/shared/services/utils/debounce.service';
@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CardComponent, AuthTypeComponent, InputComponent, ButtonComponent, UserIcon, LockIcon, FormsModule],
  providers: [CepService],
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
      type: 'tel',
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

  constructor(
    private cepService: CepService,
    private debounceService: DebounceService,
    private signupValidatorService: SignupValidatorService,
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
    const emailValidation = this.signupValidatorService.setValidation(
      this.formValues().email.value,
      Validation.Email,
      {},
    );
    this.formValues().email.validation = emailValidation;

    const nameValidation = this.signupValidatorService.setValidation(this.formValues().name.value, Validation.Name, {});
    this.formValues().name.validation = nameValidation;

    const CPFValidation = this.signupValidatorService.setValidation(this.formValues().cpf.value, Validation.CPF, {});
    this.formValues().cpf.validation = CPFValidation;

    const phoneValidation = this.signupValidatorService.setValidation(
      this.formValues().phone.value,
      Validation.Phone,
      {},
    );
    this.formValues().phone.validation = phoneValidation;

    const houseNumberValidation = this.signupValidatorService.setValidation(
      this.formValues().number.value,
      Validation.HouseNumber,
      {},
    );
    this.formValues().number.validation = houseNumberValidation;

    const complementValidation = this.signupValidatorService.setValidation(
      this.formValues().complement.value,
      Validation.Complement,
      {},
    );
    this.formValues().complement.validation = complementValidation;

    const validForm =
      !emailValidation.error &&
      !nameValidation.error &&
      !CPFValidation.error &&
      !phoneValidation.error &&
      !houseNumberValidation.error &&
      !complementValidation.error;

    if (validForm) {
      this.sendData();
      this.resetInputs();
    }
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
    }));
  }

  sendData() {
    console.log({
      email: this.formValues().email.value,
      name: this.formValues().name.value,
      CPF: this.formValues().cpf.value,
      phone: this.formValues().phone.value,
      houseNumber: this.formValues().number.value,
      complement: this.formValues().complement.value,
    });
  }
}
