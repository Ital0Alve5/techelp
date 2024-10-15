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
    const idValue = this.employeeId();
    this.router.navigate([`/funcionario/${idValue}/receita`]);
  }

  // onCheckboxChange(newValue: boolean) {
  //   this.formValues().category.value = newValue;
  //   this.formValues.set({ ...this.formValues() });
  // }
}
