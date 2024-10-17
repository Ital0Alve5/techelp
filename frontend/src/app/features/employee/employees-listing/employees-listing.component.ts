import { Component } from '@angular/core';
import { EmployeeService } from '@/shared/services/employees/employee.service';
import { EmployeesTableRowComponent } from './components/employees-table-row/employees-table-row.component';

@Component({
  selector: 'app-employees-listing',
  standalone: true,
  imports: [EmployeesTableRowComponent],
  providers: [EmployeeService],
  templateUrl: './employees-listing.component.html',
  styleUrl: './employees-listing.component.scss',
})
export class EmployeesListingComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);

  constructor(public employeeService: EmployeeService) {}

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployeeById(employeeId);
  }
}
