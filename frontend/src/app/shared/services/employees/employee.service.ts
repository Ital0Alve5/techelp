import { Injectable } from '@angular/core';
import { Employee } from '@/shared/types/employee.type';

import axios, { AxiosResponse } from 'axios';
import axiosConfig from '@/axios.config';
import { ResponseError } from '@/shared/types/api/response-error.type';
import { ResponseSuccess } from '@/shared/types/api/response-success.type';

@Injectable()
export class EmployeeService {

  async getEmployeeByIdApi(employeeId: number): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig(`/api/employee/${employeeId}`);

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

  async getAllEmployeesExceptMeApi(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const response = await axiosConfig('/api/employee/all-except-me');

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

  async getAllEmployeesApi(): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
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


  async redirectToEmployee(id_da_request: number, email: string): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const requestBody = { email };
      const response = await axiosConfig.put(`/api/employee/maintenance-requests/${id_da_request}/redirect`, requestBody);
  
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


  async updateEmployeeByIdApi(employeeId: number, employee: Employee): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const requestBody = {
          "email": employee.email,
          "name": employee.name,
          "birthdate": employee.birthdate,
      };
      const response = await axiosConfig.post(`/api/employee/edit/${employeeId}`, requestBody);
  
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

  async deleteEmployeeByIdApi(employeeId: number, employee: Employee): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const requestBody = {
          "email": employee.email,
          "name": employee.name,
          "birthdate": employee.birthdate,
          "is_active": false,
          "is_current": employee.is_current,
      };
      const response = await axiosConfig.post(`/api/employee/edit/${employeeId}`, requestBody);
  
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

  async addNewEmployeeApi(employee: Employee): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const requestBody = {
          "email": employee.email,
          "password": employee.password,
          "name": employee.name,
          "birthdate": employee.birthdate,
          "is_active": employee.is_active,
          "is_current": employee.is_current,
      };
      const response = await axiosConfig.post(`/api/employee/add`, requestBody);
  
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

  async getEmployeeByEmail(email: string): Promise<AxiosResponse<ResponseError | ResponseSuccess> | null> {
    try {
      const requestBody = {
          "email": email,
      };
      const response = await axiosConfig.post(`/api/employee/get-by-email`, requestBody);
  
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

}
