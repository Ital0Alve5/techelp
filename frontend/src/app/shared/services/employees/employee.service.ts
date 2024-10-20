import { Injectable } from '@angular/core';
import { registeredEmployee } from '@/shared/mock/registered-employee.mock';
import { Employee } from '@/shared/types/employee.type';

@Injectable()
export class EmployeeService {
  getEmployeeById(employeeId: number): Employee {
    return registeredEmployee.filter((employee) => employee.id === employeeId)[0];
  }

  getAllEmployees(): Employee[] {
    return registeredEmployee;
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
