import { Injectable } from '@angular/core';
import { maintenanceRequests } from '../../mock/maintenance-requests.mock';

@Injectable({
  providedIn: 'root',
})
export class UpdateRequestStatusService {
  constructor() {}

  updateStatus(requestId: number, employee: string, status: string, rejectReason: string = '') {
    const requestFound = maintenanceRequests.find(({ id }) => id === requestId);

    if (requestFound) {
      const lastIndex = requestFound.history.length ? requestFound.history.length - 1 : 0;
      const lastStatus = requestFound.history[lastIndex].toStatus;

      const today = new Date().toLocaleDateString();
      const time = new Date();
      const hour = time.getHours().toString().padStart(2, '0');
      const minute = time.getMinutes().toString().padStart(2, '0');

      const newEntry = {
        date: today,
        hour: `${hour}:${minute}`,
        fromStatus: lastStatus,
        toStatus: status,
        employee,
      };

      requestFound.history.push(newEntry);
      requestFound.currentStatus = status;

      requestFound.rejectReason = rejectReason;
    }
  }
}
