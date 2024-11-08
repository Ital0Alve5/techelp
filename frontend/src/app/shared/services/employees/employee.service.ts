import { Injectable } from '@angular/core';
import { registeredEmployee } from '@/shared/mock/registered-employee.mock';
import { Employee } from '@/shared/types/employee.type';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

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

  async getAllEmployeesExceptMeApi(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/employee/maintenance-requests/all-employees');

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  async redirectToEmployee(id_da_request: number,): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig(`/api/employee/maintenance-requests/${id_da_request}/redirect`);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }



  checkIfEmployeeExists(employeeToCheck: Partial<{ id: number; email: string }>): boolean {
    if (employeeToCheck.id && this.getEmployeeById(employeeToCheck.id)) return true;

    return Boolean(registeredEmployee.find((employee) => employee.email === employeeToCheck.email));
  }

  addNewEmployee(newEmployee: Omit<Employee, 'id'>): boolean {
    if (this.checkIfEmployeeExists({ email: newEmployee.email })) {
      return false;
    }

    registeredEmployee.push({ ...newEmployee, id: Math.random() * (100 - 7) + 7 });

    return true;
  }

  updateEmployeeById(employeeId: number, data: Partial<Employee>): boolean {
    const employee = this.getEmployeeById(employeeId)!

    if (data.email && (employee.email !== data.email) && this.checkIfEmployeeExists({ email: data.email })) {
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
