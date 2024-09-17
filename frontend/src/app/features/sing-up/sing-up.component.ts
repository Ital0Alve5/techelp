import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { Mask } from '@/shared/enums/mask.enum';
import { CepService } from './services/cep.service';
import { SignupValidatorService } from '@/shared/services/input/signup-validator.service';
import { Validation } from '@/shared/enums/validation.enum';
import { DebounceService } from '@/shared/services/utils/debounce.service';
import { CheckDatabaseService } from '@/shared/services/input/check-database.service';
import { SelectComponent } from '@/shared/ui/select/select.component';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [
    CardComponent,
    ModalComponent,
    AuthTypeComponent,
    InputComponent,
    ButtonComponent,
    UserIcon,
    LockIcon,
    FormsModule,
    SelectComponent,
  ],
  providers: [CepService],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent {
  states = [
    { value: 'acre', label: 'AC' },
    { value: 'alagoas', label: 'AL' },
    { value: 'amapa', label: 'AP' },
    { value: 'amazonas', label: 'AM' },
    { value: 'bahia', label: 'BA' },
    { value: 'ceara', label: 'CE' },
    { value: 'distritoFederal', label: 'DF' },
    { value: 'espiritoSanto', label: 'ES' },
    { value: 'goias', label: 'GO' },
    { value: 'maranhao', label: 'MA' },
    { value: 'matoGrosso', label: 'MT' },
    { value: 'matoGrossoDoSul', label: 'MS' },
    { value: 'minasGerais', label: 'MG' },
    { value: 'para', label: 'PA' },
    { value: 'paraiba', label: 'PB' },
    { value: 'parana', label: 'PR' },
    { value: 'pernambuco', label: 'PE' },
    { value: 'piaui', label: 'PI' },
    { value: 'rioDeJaneiro', label: 'RJ' },
    { value: 'rioGrandeDoNorte', label: 'RN' },
    { value: 'rioGrandeDoSul', label: 'RS' },
    { value: 'rondonia', label: 'RO' },
    { value: 'roraima', label: 'RR' },
    { value: 'santaCatarina', label: 'SC' },
    { value: 'saoPaulo', label: 'SP' },
    { value: 'sergipe', label: 'SE' },
    { value: 'tocantins', label: 'TO' },
  ];

  formValues = signal({
    email: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    name: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    cpf: {
      value: '',
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
      validation: {
        error: false,
        message: '',
      },
      mask: Mask.Cep,
    },
    state: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    city: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    neighborhood: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    street: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    number: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    complement: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
    password: {
      value: '',
      validation: {
        error: false,
        message: '',
      },
    },
  });

  isPassConfirmationModalOpen = signal(true);

  constructor(
    private cepService: CepService,
    private debounceService: DebounceService,
    private checkDatabaseService: CheckDatabaseService,
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

  confirmPassword() {
    this.isPassConfirmationModalOpen.set(true);
  }

  onSubmit() {
    if (this.checkDatabaseService.checkCpf(this.formValues().cpf.value)) {
      console.log('CPF já usado');
    }
    if (this.checkDatabaseService.checkEmail(this.formValues().email.value)) {
      console.log('email já usado');
    }
    const CpfUsed = this.checkDatabaseService.checkCpf(this.formValues().cpf.value);
    this.formValues().cpf.validation.error = CpfUsed;
    if (CpfUsed) {
      this.formValues().cpf.validation.message = 'CPF já está em uso!';
    }

    const EmailUsed = this.checkDatabaseService.checkEmail(this.formValues().email.value);
    this.formValues().email.validation.error = EmailUsed;
    if (EmailUsed) {
      this.formValues().email.validation.message = 'E-Mail já está em uso!';
    }

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

    const cepValidation = this.signupValidatorService.setValidation(this.formValues().cep.value, Validation.CEP, {});
    this.formValues().cep.validation = cepValidation;

    const cidadeValidation = this.signupValidatorService.setValidation(
      this.formValues().city.value,
      Validation.Cidade,
      {},
    );
    this.formValues().city.validation = cidadeValidation;

    const ruaValidation = this.signupValidatorService.setValidation(this.formValues().street.value, Validation.Rua, {});
    this.formValues().street.validation = ruaValidation;

    const bairroValidation = this.signupValidatorService.setValidation(
      this.formValues().neighborhood.value,
      Validation.Bairro,
      {},
    );
    this.formValues().neighborhood.validation = bairroValidation;

    const validForm =
      !emailValidation.error &&
      !nameValidation.error &&
      !CPFValidation.error &&
      !phoneValidation.error &&
      !houseNumberValidation.error &&
      !complementValidation.error &&
      !ruaValidation.error &&
      !bairroValidation.error &&
      !cidadeValidation.error &&
      !CpfUsed &&
      !EmailUsed &&
      !cepValidation.error;

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
    }));
  }

  sendData() {
    this.isPassConfirmationModalOpen.set(false);

    console.log({
      email: this.formValues().email.value,
      name: this.formValues().name.value,
      CPF: this.formValues().cpf.value,
      phone: this.formValues().phone.value,
      houseNumber: this.formValues().number.value,
      complement: this.formValues().complement.value,
      cep: this.formValues().cep.value,
      rua: this.formValues().street.value,
      bairro: this.formValues().neighborhood.value,
      cidade: this.formValues().city.value,
      estado: this.formValues().state.value,
    });
  }
}
