import { Injectable } from '@angular/core';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable({
  providedIn: 'root',
})
export class RedirectMaintenanceService {
  constructor() {}

  redirectMaintenance(requestId: number, newEmployeeId: number): boolean {
    const request = maintenanceRequests.find((req) => req.id === requestId);

    if (request) {
      request.employeeId = newEmployeeId;
      request.currentStatus = 'Redirecionada';
      return true;
    } else {
      return false;
    }
  }
}
