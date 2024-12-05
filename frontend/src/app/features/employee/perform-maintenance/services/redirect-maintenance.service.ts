import { Injectable } from '@angular/core';

import { EmployeeService } from '@/shared/services/employees/employee.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
@Injectable()
export class RedirectMaintenanceService {
  constructor(
    private employeeService: EmployeeService,
    private popupService: PopupService,
  ) {}

  async redirectMaintenance(requestId: number, newEmployeeEmail: string) {
    const response = await this.employeeService.redirectToEmployee(requestId, newEmployeeEmail);

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
  }
}
