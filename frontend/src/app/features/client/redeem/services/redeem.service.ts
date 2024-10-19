import { Injectable } from '@angular/core';

import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class RedeemService {
  redeemRequestByRequestId(requestId: number) {
    return maintenanceRequests
      .filter((request) => request.id === requestId)
      ?.map((request) => {
        return {
          deviceDescription: request.deviceDescription,
          deviceCategory: request.deviceCategory,
          issueDescription: request.issueDescription,
          price: request.price,
          date: request.date,
          hour: request.hour,
          employee: request.history[request.history.length - 1].employee,
          currentStatus: request.currentStatus,
          rejectReason: request.rejectReason,
        };
      })?.[0];
  }
}
