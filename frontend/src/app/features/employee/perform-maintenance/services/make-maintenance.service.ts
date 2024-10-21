import { Injectable } from '@angular/core';

import { RequestsService } from '@/shared/services/requests/requests.service';
import { EmployeeService } from '@/shared/services/employees/employee.service';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class MakeMaintenanceService {
  constructor(
    private requestsService: RequestsService,
    private employeeService: EmployeeService,
  ) {}

  confirmMaintenanceDetails(
    requestId: number,
    employeeId: number,
    maintenanceDescription: string,
    orientationToClient: string,
  ): boolean {
    const request = maintenanceRequests.find((request) => request.id === requestId);

    if (!request) return false;

    request.maintenanceDescription = maintenanceDescription;
    request.oritentationToClient = orientationToClient;

    const employee = this.employeeService.getEmployeeById(employeeId);

    if (!employee) return false;

    this.requestsService.updateStatus(requestId, employee.name, 'Aguardando Pagamento');

    return true;
  }
}
