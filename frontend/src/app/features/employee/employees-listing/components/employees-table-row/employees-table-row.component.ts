import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr[app-employees-table-row]',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, FormsModule],
  templateUrl: './employees-table-row.component.html',
  styleUrls: ['./employees-table-row.component.scss'],
})
export class EmployeesTableRowComponent {
  employeeLabel = input.required<string>();
  employeeId = input.required<number>();

  deleteEmployee = output<number>();

  openDeleteCategoryModal() {
    this.deleteEmployee.emit(this.employeeId());
  }
}
