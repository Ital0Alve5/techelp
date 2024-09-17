import { Injectable } from '@angular/core';
import {
  EmailValidationService,
  RequiredValidationService,
  NameValidationService,
  CPFValidationService,
  PhoneValidationService,
  HouseNumberValidationService,
  ComplementValidationService,
  CEPValidationService,
  CidadeValidationService,
  BairroValidationService,
  RuaValidationService,
} from './validations.service';
import { Validation } from '@/shared/enums/validation.enum';
import { InputError } from '@/shared/types/input-error.type';

@Injectable({ providedIn: 'root' })
export class SignupValidatorService {
  constructor(
    private emailValidationService: EmailValidationService,
    private requiredValidationService: RequiredValidationService,
    private nameValidationService: NameValidationService,
    private CpfValidatorService: CPFValidationService,
    private phoneValidatorService: PhoneValidationService,
    private houseNumberValidationService: HouseNumberValidationService,
    private complementValidationService: ComplementValidationService,
    private cepValidationService: CEPValidationService,
    private cidadeValidationService: CidadeValidationService,
    private bairroValidationService: BairroValidationService,
    private ruaValidationService: RuaValidationService,
  ) {}

  setValidation(
    inputValue: string,
    validation: Validation,
    {
      fieldName,
    }: {
      fieldName?: string;
    },
  ): InputError {
    switch (validation) {
      case Validation.Email:
        return this.validateEmail(inputValue);
      case Validation.Required:
        return this.validateRequired(inputValue, fieldName);
      case Validation.Name:
        return this.validateName(inputValue);
      case Validation.CPF:
        return this.validateCPF(inputValue);
      case Validation.Phone:
        return this.validatePhone(inputValue);
      case Validation.HouseNumber:
        return this.validateHouseNumber(inputValue);
      case Validation.Complement:
        return this.validateComplement(inputValue);
      case Validation.CEP:
        return this.validateCEP(inputValue);
      case Validation.Cidade:
        return this.validateCidade(inputValue);
      case Validation.Bairro:
        return this.validateBairro(inputValue);
      case Validation.Rua:
        return this.validateRua(inputValue);
      default:
        return { error: true, message: 'Tipo de campo desconhecido' };
    }
  }

  validateRequired(inputValue: string, fieldName: string | undefined) {
    if (fieldName) this.requiredValidationService.setFieldName(fieldName);
    return this.requiredValidationService.validate(inputValue);
  }

  validateEmail(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'E-mail');

    if (result.error) return result;

    result = this.emailValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateName(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Nome');

    if (result.error) return result;

    result = this.nameValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateCPF(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'CPF');

    if (result.error) return result;

    result = this.CpfValidatorService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validatePhone(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Telefone');

    if (result.error) return result;

    result = this.phoneValidatorService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateHouseNumber(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Número');

    if (result.error) return result;

    result = this.houseNumberValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateComplement(inputValue: string) {
    const result = this.complementValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateCEP(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'CEP');

    if (result.error) return result;

    result = this.cepValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateCidade(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Cidade');

    if (result.error) return result;

    result = this.cidadeValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateBairro(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Bairro');

    if (result.error) return result;

    result = this.bairroValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }

  validateRua(inputValue: string) {
    let result = {
      error: false,
      message: '',
    };

    result = this.validateRequired(inputValue, 'Rua');

    if (result.error) return result;

    result = this.ruaValidationService.validate(inputValue);

    if (result.error) return result;

    return result;
  }
}
