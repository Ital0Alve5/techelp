import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MaxLengthValidator } from '@/shared/services/validators/max-length-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { DeviceCategoryValidator } from '@/shared/services/validators/device-category.service';
import { RequestMaintenanceService } from './services/request-maintenance.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';

import { formData } from './model/form-data.model';
import { Categorie } from './types/categorie.type';
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
  providers: [
    RequiredValidator,
    MaxLengthValidator,
    MinLengthValidator,
    DeviceCategoryValidator,
    RequestMaintenanceService,
  ],
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.scss'],
})
export class RequestMaintenanceComponent implements OnInit {
  formValues = signal(JSON.parse(JSON.stringify(formData)));
  deviceCategories = signal<Categorie[]>([]);

  constructor(
    private requiredValidator: RequiredValidator,
    private maxLengthValidator: MaxLengthValidator,
    private minLengthValidator: MinLengthValidator,
    private deviceCategoryValidator: DeviceCategoryValidator,
    private requestMaintenanceService: RequestMaintenanceService,
    private popupService: PopupService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    const success = await this.requestMaintenanceService.getCategories();

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

    const maintenanceRequestsList = success.data.data?.['deviceCategories'] as unknown;

    if (Array.isArray(maintenanceRequestsList)) {
      this.deviceCategories.set(maintenanceRequestsList as Categorie[]);
    } else {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Formato inesperado da lista de categorias.',
      });
    }
  }

  resetInputs() {
    this.formValues.update(() => JSON.parse(JSON.stringify(formData)));
  }

  async sendData() {
    const response = await this.requestMaintenanceService.send({
      deviceDescription: this.formValues().deviceDescription.value,
      categoryId: this.formValues().deviceCategory.value,
      issueDescription: this.formValues().issueDescription.value,
    });

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: response.data.message,
    });

    this.router.navigate([`/cliente/solicitacoes`]);
  }

  onSubmit() {
    const { deviceDescription, issueDescription, deviceCategory } = this.formValues();

    this.minLengthValidator.setMinLength(5);
    this.maxLengthValidator.setMaxLength(50);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().deviceDescription.validation = this.requiredValidator.validate(deviceDescription.value);

    this.minLengthValidator.setMinLength(5);
    this.maxLengthValidator.setMaxLength(150);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.formValues().issueDescription.validation = this.requiredValidator.validate(issueDescription.value);

    this.requiredValidator.setNext(this.deviceCategoryValidator);
    this.formValues().deviceCategory.validation = this.requiredValidator.validate(deviceCategory.value);

    if (!deviceDescription.validation.error && !issueDescription.validation.error && !deviceCategory.validation.error) {
      this.sendData();
      this.resetInputs();
    }
  }
}
