import { Injectable } from '@angular/core';
import { maintenanceRequests } from '../../mock/maintenance-requests.mock';

@Injectable({
  providedIn: 'root',
})
export class UpdateRequestStatusService {
  constructor() {}

  updateStatus(requestId: number, employee: string, status: string) {
    const requestFound = maintenanceRequests.find(({ id }) => id === requestId);

    if (requestFound) {
      const lastIndex = requestFound.history.length ? requestFound.history.length - 1 : 0;
      const lastStatus = requestFound.history[lastIndex].toStatus;

      const newEntry = {
        date: '00/00/0000',
        hour: '00:00',
        fromStatus: lastStatus,
        toStatus: status,
        employee,
      };

      requestFound.history.push(newEntry);
    }
  }
}
