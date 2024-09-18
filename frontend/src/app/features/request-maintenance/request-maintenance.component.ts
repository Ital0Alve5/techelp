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
import { deviceCategories } from './constants/device-categories.constant';
import { DeviceCategoryValidator } from '@/shared/services/validators/device-category.service';
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
  providers: [RequiredValidator, MaxLengthValidator, MinLengthValidator, DeviceCategoryValidator],
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.scss'],
})
export class RequestMaintenanceComponent {
  formValues = signal(JSON.parse(JSON.stringify(formData)));
  deviceCategories = deviceCategories;

  constructor(
    private requiredValidator: RequiredValidator,
    private maxLengthValidator: MaxLengthValidator,
    private minLengthValidator: MinLengthValidator,
    private deviceCategoryValidator: DeviceCategoryValidator,
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
    const { deviceDescription, defectDescription, deviceCategory } = this.formValues();

    this.minLengthValidator.setMinLength(5);
    this.maxLengthValidator.setMaxLength(50);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().deviceDescription.validation = this.requiredValidator.validate(deviceDescription.value);

    this.minLengthValidator.setMinLength(5);
    this.maxLengthValidator.setMaxLength(150);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().defectDescription.validation = this.requiredValidator.validate(defectDescription.value);

    this.requiredValidator.setNext(this.deviceCategoryValidator);
    this.formValues().deviceCategory.validation = this.requiredValidator.validate(deviceCategory.value);

    if (
      !deviceDescription.validation.error &&
      !defectDescription.validation.error &&
      !deviceCategory.validation.error
    ) {
      this.sendData();
      this.resetInputs();
    }
  }
}
