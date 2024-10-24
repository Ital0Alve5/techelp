import { Injectable } from '@angular/core';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class RequestDetailsService {
  getRequestDetailsByRequestId(requestId: number) {
    return maintenanceRequests
      .filter((request) => request.id === requestId)
      ?.map((request) => {
        return {
          deviceDescription: request.deviceDescription,
          deviceCategory: request.deviceCategory,
          issueDescription: request.issueDescription,
          date: request.date,
          hour: request.hour,
          employee: request.history.length > 0 ? request.history[request.history.length - 1].employee : null,
          currentStatus: request.currentStatus,
          history: request.history,
        };
      })?.[0];
  }
}
