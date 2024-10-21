import { Injectable } from '@angular/core';
import { registeredEmployee } from '@/shared/mock/registered-employee.mock';
import { Employee } from '@/shared/types/employee.type';

@Injectable()
export class EmployeeService {
  getEmployeeById(employeeId: number): Employee | undefined {
    return registeredEmployee.find((employee) => employee.id === employeeId);
  }

  getAllEmployees(): Employee[] {
    return registeredEmployee;
  }

  getAllEmployeesExceptMe(employeeId: number): Employee[] {
    return this.getAllEmployees().filter((employee) => employee.id !== employeeId);
  }

  addNewEmployee(newEmployee: Omit<Employee, 'id'>): Employee[] {
    registeredEmployee.push({ ...newEmployee, id: Math.random() * (100 - 7) + 7 });
    return registeredEmployee;
  }

  deleteEmployeeById(employeeId: number): Employee[] {
    registeredEmployee.forEach((employee, index) => {
      if (employee.id === employeeId) registeredEmployee.splice(index, 1);
    });
    return registeredEmployee;
  }
}
