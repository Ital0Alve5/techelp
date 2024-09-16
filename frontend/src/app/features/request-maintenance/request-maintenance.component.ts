import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { ValidatorService } from '@/shared/services/input/validator.service';
import { Validation } from '@/shared/enums/validation.enum';

@Component({
  selector: 'app-request-maintenance',
  standalone: true,
  imports: [CardComponent, AuthTypeComponent, TextareaComponent, ButtonComponent, UserIcon, LockIcon, SelectComponent, FormsModule],
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.scss'],
})
export class RequestMaintenanceComponent {
  formValues = signal({
    deviceCategory: {
      value: '',
      type: 'select',
      validation: {
        error: false,
        message: '',
      },
    },
    deviceDescription: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
    defectDescription: {
      value: '',
      type: 'text',
      validation: {
        error: false,
        message: '',
      },
    },
  });

  constructor(private validatorService: ValidatorService) {}

  resetInputs() {
    this.formValues.update((currentValues) => ({
      ...currentValues,
      deviceCategory: {
        value: '',
        type: 'select',
        validation: {
          error: false,
          message: '',
        },
      },
      deviceDescription: {
        value: '',
        type: 'text',
        validation: {
          error: false,
          message: '',
        },
      },
      defectDescription: {
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
      deviceDescription: this.formValues().deviceDescription.value,
      deviceCategory: this.formValues().deviceCategory.value,
      defectDescription: this.formValues().defectDescription.value,
    });
  }

  onSubmit() {
    const deviceMinLengthValidation = this.validatorService.setValidation(
      this.formValues().deviceDescription.value,
      Validation.MinLength,
      { minLength: 5 }
    );
  
    const deviceMaxLengthValidation = this.validatorService.setValidation(
      this.formValues().deviceDescription.value,
      Validation.MaxLength,
      { maxLength: 50 }
    );
  
    const defectMinLengthValidation = this.validatorService.setValidation(
      this.formValues().defectDescription.value,
      Validation.MinLength,
      { minLength: 5 }
    );
  
    const defectMaxLengthValidation = this.validatorService.setValidation(
      this.formValues().defectDescription.value,
      Validation.MaxLength,
      { maxLength: 150 }
    );
  
    // Combinar as validações de deviceDescription
    const deviceDescriptionValidation = {
      error: deviceMinLengthValidation.error || deviceMaxLengthValidation.error,
      message: deviceMinLengthValidation.error 
        ? deviceMinLengthValidation.message 
        : deviceMaxLengthValidation.message
    };
  
    // Combinar as validações de defectDescription
    const defectDescriptionValidation = {
      error: defectMinLengthValidation.error || defectMaxLengthValidation.error,
      message: defectMinLengthValidation.error 
        ? defectMinLengthValidation.message 
        : defectMaxLengthValidation.message
    };
  
    // Atribuir as validações consolidadas
    this.formValues().deviceDescription.validation = deviceDescriptionValidation;
    this.formValues().defectDescription.validation = defectDescriptionValidation;
  
    // Verificar se todas as validações passaram
    if (!deviceDescriptionValidation.error && !defectDescriptionValidation.error) {
      this.sendData();
      this.resetInputs();
    }
  }
   
}