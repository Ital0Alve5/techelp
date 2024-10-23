import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { CardComponent } from '@/shared/ui/card/card.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { CheckboxComponent } from '@/shared/ui/checkbox/checkbox.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { DateValidator } from '@/shared/services/validators/date-validator.service';

import { formData } from './model/form-data.model';

@Component({
  selector: 'app-request-revenue',
  standalone: true,
  imports: [FormsModule, LockIcon, CardComponent, InputComponent, CheckboxComponent, ButtonComponent],
  providers: [RequiredValidator, DateValidator],
  templateUrl: './request-revenue.component.html',
  styleUrl: './request-revenue.component.scss',
})
export class RequestRevenueComponent {
  employeeId = input.required<number>();
  formValues = signal(JSON.parse(JSON.stringify(formData)));
  isCategory = signal(true);

  date = new Date();
  currentDate = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;

  constructor(
    private router: Router,
    private requiredValidator: RequiredValidator,
    private dateValidator: DateValidator,
  ) {}

  onSubmit() {
    if (!this.isCategory && !this.validateDate()) return;

    const params = this.isCategory()
      ? {}
      : {
          queryParams: {
            startDate: this.formValues().startDate.value,
            endDate: this.formValues().endDate.value,
          },
        };

    this.router.navigate([`/funcionario/${this.employeeId()}/receita${this.isCategory() ? '/categoria' : ''}`], params);
  }

  validateDate() {
    const { startDate, endDate } = this.formValues();

    this.requiredValidator.setNext(this.dateValidator);
    this.formValues().startDate.validation = this.requiredValidator.validate(this.formmatDate(startDate.value));

    this.requiredValidator.setNext(this.dateValidator);
    this.formValues().endDate.validation = this.requiredValidator.validate(this.formmatDate(endDate.value));

    const isValidForm = !startDate.validation.error && !endDate.validation.error;

    return isValidForm;
  }

  formmatDate(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  chooseCategory() {
    this.isCategory.set(true);
  }

  chooseDate() {
    this.isCategory.set(false);
  }
}
