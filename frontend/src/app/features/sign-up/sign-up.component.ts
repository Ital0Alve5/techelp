import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
import { LoadingScreenComponent } from '@/shared/ui/loading-screen/loading-screen.component';

import { DebounceService } from '@/shared/services/utils/debounce.service';
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
import { UfValidator } from '@/shared/services/validators/uf-validator.service';
import { NumericValidator } from '@/shared/services/validators/numeric-validator.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';

import { CepService } from './services/cep.service';
import { states } from './constants/states.constant';
import { formData } from './model/form-data.model';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'app-sign-up',
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
    LoadingScreenComponent,
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
    UfValidator,
    NumericValidator,
    SignUpService,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  formValues = signal(JSON.parse(JSON.stringify(formData)));
  isPassConfirmationModalOpen = signal(true);
  isLoading = signal(true);
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
    private ufValidator: UfValidator,
    private numericValidator: NumericValidator,
    private signUpService: SignUpService,
    private popupService: PopupService,
    private router: Router,
  ) {}

  setAddressUsingCep(cep: string) {
    if (cep.replace(/[^0-9]/g, '').length < 8) {
      this.cleanAddressFields();
      this.clearCepError();
      this.enableAddressFields();
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
        this.clearAddressError();
        this.disableAddressFields();
      } else {
        if (response.message.includes('indisponível')) this.enableAddressFields();
        else this.disableAddressFields();

        this.cleanAddressFields();
        this.formValues().cep.validation = response;
      }
    });
  }

  enableAddressFields() {
    this.formValues().state.disabled = false;
    this.formValues().city.disabled = false;
    this.formValues().neighborhood.disabled = false;
  }

  disableAddressFields() {
    this.formValues().state.disabled = true;
    this.formValues().city.disabled = true;
    this.formValues().neighborhood.disabled = true;
  }

  cleanAddressFields() {
    this.formValues().state.value = '';
    this.formValues().city.value = '';
    this.formValues().neighborhood.value = '';
    this.formValues().street.value = '';
    this.formValues().number.value = '';
  }

  clearCepError() {
    this.formValues().cep.validation = { error: false, message: '' };
  }

  clearAddressError() {
    this.formValues().state.validation = { error: false, message: '' };
    this.formValues().city.validation = { error: false, message: '' };
    this.formValues().neighborhood.validation = { error: false, message: '' };
    this.formValues().street.validation = { error: false, message: '' };

    if (this.formValues().number.value) {
      this.formValues().number.validation = { error: false, message: '' };
    }
  }

  onSubmit() {
    const { email, name, cpf, phone, cep, city, state, neighborhood, street, number, complement } = this.formValues();

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

    this.requiredValidator.setNext(this.ufValidator);
    this.formValues().state.validation = this.requiredValidator.validate(state.value);

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
      !cep.validation.error &&
      !state.validation.error;

    if (validForm) this.sendData();
  }

  async confirmPassword() {
    const { password } = this.formValues();

    this.maxLengthValidator.setMaxLength(4);
    this.requiredValidator
      .setNext(this.numericValidator)
      .setNext(this.minLengthValidator)
      .setNext(this.maxLengthValidator);
    this.formValues().password.validation = this.requiredValidator.validate(password.value);

    if (password.validation.error) return;

    const success = await this.signUpService.createNewClient({
      email: this.formValues().email.value,
      password: this.formValues().password.value,
      name: this.formValues().name.value,
      cpf: this.formValues().cpf.value,
      phone: this.formValues().phone.value,
      number: this.formValues().number.value,
      complement: this.formValues().complement.value,
      cep: this.formValues().cep.value,
      street: this.formValues().street.value,
      neighborhood: this.formValues().neighborhood.value,
      city: this.formValues().city.value,
      state: this.formValues().state.value,
    });

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

    this.router.navigate([`/cliente/solicitacoes`]);
  }

  async sendData() {
    const isValid = await this.signUpService.validate({
      email: this.formValues().email.value,
      cpf: this.formValues().cpf.value,
      name: this.formValues().name.value,
      phone: this.formValues().phone.value,
      cep: this.formValues().cep.value,
      state: this.formValues().state.value,
      city: this.formValues().city.value,
      neighborhood: this.formValues().neighborhood.value,
      street: this.formValues().street.value,
      number: this.formValues().number.value,
      complement: this.formValues().complement.value,
    });

    if (!isValid?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in isValid.data) {
      Object.values(isValid.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: isValid!.data.message,
    });

    await this.sendPasswordByEmail();
  }

  async sendPasswordByEmail() {
    this.isLoading.set(false);

    const emailWasSent = await this.signUpService.sendPasswordByEmail({
      email: this.formValues().email.value,
      name: this.formValues().name.value,
    });

    this.isLoading.set(true);

    if (!emailWasSent?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in emailWasSent.data) {
      Object.values(emailWasSent.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: emailWasSent.data.message,
    });

    this.isPassConfirmationModalOpen.set(false);
  }
}
