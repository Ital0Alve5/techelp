import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { CardComponent } from '@/shared/ui/card/card.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { CheckboxComponent } from '@/shared/ui/checkbox/checkbox.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';

import { formData } from './model/form-data.model';

@Component({
  selector: 'app-request-revenue',
  standalone: true,
  imports: [FormsModule, LockIcon, CardComponent, InputComponent, CheckboxComponent, ButtonComponent],
  templateUrl: './request-revenue.component.html',
  styleUrl: './request-revenue.component.scss',
})
export class RequestRevenueComponent {
  employeeId = input.required<number>();
  formValues = signal(JSON.parse(JSON.stringify(formData)));

  constructor(private router: Router) {}

  onSubmit() {
    this.validateDate();
    const idValue = this.employeeId();
    this.router.navigate([`/funcionario/${idValue}/receita`]);
  }

  validateDate() {
    const todayDate = new Date();
    const startDate = new Date(this.formValues().startDate.value);
    const endDate = new Date(this.formValues().endDate.value);

    if (startDate > todayDate) {
      this.formValues().startDate.value = this.formatDate(todayDate);
    }
    if (endDate > todayDate) {
      this.formValues().endDate.value = this.formatDate(todayDate);
    }
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}