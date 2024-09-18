import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MaxLengthValidator } from '@/shared/services/validators/max-length-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { formData } from './model/form-data.model';

@Component({
  selector: 'app-request-maintenance',
  standalone: true,
  imports: [
    CardComponent,
    AuthTypeComponent,
    TextareaComponent,
    ButtonComponent,
    UserIcon,
    LockIcon,
    SelectComponent,
    FormsModule,
  ],
  providers: [RequiredValidator, MaxLengthValidator, MinLengthValidator],
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.scss'],
})
export class RequestMaintenanceComponent {
  formValues = signal(JSON.parse(JSON.stringify(formData)));

  constructor(
    private requiredValidator: RequiredValidator,
    private maxLengthValidator: MaxLengthValidator,
    private minLengthValidator: MinLengthValidator,
  ) {}

  resetInputs() {
    this.formValues.update(() => JSON.parse(JSON.stringify(formData)));
  }

  sendData() {
    console.log({
      deviceDescription: this.formValues().deviceDescription.value,
      deviceCategory: this.formValues().deviceCategory.value,
      defectDescription: this.formValues().defectDescription.value,
    });
  }

  onSubmit() {
    const { deviceDescription, defectDescription } = this.formValues();

    this.minLengthValidator.setMinLength(5);
    this.maxLengthValidator.setMaxLength(50);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().deviceDescription.validation = this.requiredValidator.validate(deviceDescription.value);

    this.minLengthValidator.setMinLength(5);
    this.maxLengthValidator.setMaxLength(150);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().defectDescription.validation = this.requiredValidator.validate(defectDescription.value);

    if (!deviceDescription.validation.error && !defectDescription.validation.error) {
      this.sendData();
      this.resetInputs();
    }
  }
}
