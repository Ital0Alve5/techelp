import { Injectable } from '@angular/core';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class RedirectMaintenanceService {
  redirectMaintenance(requestId: number, newEmployeeId: number): boolean {

    const request = maintenanceRequests.find((req) => req.id === requestId);

    if (!request) return false;

    request.employeeId = newEmployeeId;
    request.currentStatus = 'Redirecionada';

    return true;
  }
}
