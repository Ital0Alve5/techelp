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

  checkIfEmployeeExists(employeeToCheck: Partial<{ id: number; email: string }>): boolean {
    if (employeeToCheck.id && this.getEmployeeById(employeeToCheck.id)) return true;
    // else if (employeeToCheck.cpf) {
    //   return Boolean(registeredEmployee.find((employee) => employee.cpf === employeeToCheck.cpf));
    // }

    return Boolean(registeredEmployee.find((employee) => employee.email === employeeToCheck.email));
  }

  addNewEmployee(newEmployee: Omit<Employee, 'id'>): boolean {
    if (
      // this.checkIfEmployeeExists({ cpf: newEmployee.cpf }) ||
      this.checkIfEmployeeExists({ email: newEmployee.email })
    ) {
      return false;
    }

    registeredEmployee.push({ ...newEmployee, id: Math.random() * (100 - 7) + 7 });

    return true;
  }

  updateEmployeeById(employeeId: number, data: Partial<Employee>): boolean {
    if (
      // (data.cpf && this.checkIfEmployeeExists({ cpf: data.cpf })) ||
      (data.email && this.checkIfEmployeeExists({ email: data.email }))
    ) {
      return false;
    }

    registeredEmployee.forEach((employee) => {
      if (employee.id === employeeId) Object.assign(employee, data);
    });

    return true;
  }

  deleteEmployeeById(employeeId: number): Employee[] {
    registeredEmployee.forEach((employee, index) => {
      if (employee.id === employeeId) registeredEmployee.splice(index, 1);
    });

    return registeredEmployee;
  }
}
