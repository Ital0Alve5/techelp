import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { CepService } from './services/cep.service';
import { DebounceService } from '@/shared/services/utils/debounce.service';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { EmailValidator } from '@/shared/services/validators/email-validator.service';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MaxLengthValidator } from '@/shared/services/validators/max-length-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { CityValidator } from '@/shared/services/validators/city-validator.service';
import { ComplementValidator } from '@/shared/services/validators/complement-validator.service';
import { CpfValidator } from '@/shared/services/validators/cpf-validator.service';
import { HouseNumberValidator } from '@/shared/services/validators/house-number.service';
import { NameValidator } from '@/shared/services/validators/name-validator.service';
import { NeighborhoodValidator } from '@/shared/services/validators/neighborhood-validator.service';
import { StreetValidator } from '@/shared/services/validators/street-validator.service';
import { CepValidator } from '@/shared/services/validators/cep-validator.service';
import { PhoneValidator } from '@/shared/services/validators/phone-validator.service';
import { states } from './constants/states.constant';
import { formData } from './model/form-data.model';
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
  providers: [
    CepService,
    EmailValidator,
    RequiredValidator,
    MaxLengthValidator,
    MinLengthValidator,
    CityValidator,
    ComplementValidator,
    CpfValidator,
    HouseNumberValidator,
    NameValidator,
    NeighborhoodValidator,
    StreetValidator,
    CepValidator,
    PhoneValidator,
  ],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent {
  formValues = signal(JSON.parse(JSON.stringify(formData)));
  isPassConfirmationModalOpen = signal(true);
  states = states;

  constructor(
    private cepService: CepService,
    private debounceService: DebounceService,
    private emailValidator: EmailValidator,
    private requiredValidator: RequiredValidator,
    private maxLengthValidator: MaxLengthValidator,
    private minLengthValidator: MinLengthValidator,
    private cityValidator: CityValidator,
    private complementValidator: ComplementValidator,
    private cpfValidator: CpfValidator,
    private houseNumberValidator: HouseNumberValidator,
    private nameValidator: NameValidator,
    private neighborhoodValidator: NeighborhoodValidator,
    private streetValidator: StreetValidator,
    private cepValidator: CepValidator,
    private phoneValidator: PhoneValidator,
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
    const { email, name, cpf, phone, cep, city, neighborhood, street, number, complement, password } =
      this.formValues();

    this.requiredValidator.setNext(this.emailValidator);
    this.formValues().email.validation = this.requiredValidator.validate(email.value);

    this.requiredValidator.setNext(this.nameValidator);
    this.formValues().name.validation = this.requiredValidator.validate(name.value);

    this.requiredValidator.setNext(this.cpfValidator);
    this.formValues().cpf.validation = this.requiredValidator.validate(cpf.value);

    this.requiredValidator.setNext(this.phoneValidator);
    this.formValues().phone.validation = this.requiredValidator.validate(phone.value);

    this.requiredValidator.setNext(this.cepValidator);
    this.formValues().cep.validation = this.requiredValidator.validate(cep.value);

    this.requiredValidator.setNext(this.cityValidator);
    this.formValues().city.validation = this.requiredValidator.validate(city.value);

    this.requiredValidator.setNext(this.neighborhoodValidator);
    this.formValues().neighborhood.validation = this.requiredValidator.validate(neighborhood.value);

    this.requiredValidator.setNext(this.streetValidator);
    this.formValues().street.validation = this.requiredValidator.validate(street.value);

    this.requiredValidator.setNext(this.houseNumberValidator);
    this.formValues().number.validation = this.requiredValidator.validate(number.value);

    this.formValues().complement.validation = this.complementValidator.validate(complement.value);

    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().password.validation = this.requiredValidator.validate(password.value);

    const validForm =
      !email.validation.error &&
      !name.validation.error &&
      !cpf.validation.error &&
      !phone.validation.error &&
      !number.validation.error &&
      !complement.validation.error &&
      !street.validation.error &&
      !neighborhood.validation.error &&
      !city.validation.error &&
      !cep.validation.error;

    if (validForm) {
      this.sendData();
      this.resetInputs();
    }
  }

  resetInputs() {
    this.formValues.update(() => JSON.parse(JSON.stringify(formData)));
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
