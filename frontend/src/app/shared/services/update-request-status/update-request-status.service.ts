import { Injectable } from '@angular/core';
import { requestHistoryMock } from '@/shared/mock/request.mock';
import { loggedUserMock } from '@/shared/mock/logged-user.mock';

@Injectable({
  providedIn: 'root',
})
export class UpdateRequestStatusService {
  constructor() {}

  updateStatus(requestId: number, employee: string, status: string) {
    const requestHistory = requestHistoryMock.find(({ id }) => id === requestId);
    const requestSum = loggedUserMock.requests.find(({ id }) => id === requestId);

    if (requestHistory && requestSum) {
      const lastIndex = requestHistory.history.length ? requestHistory.history.length - 1 : 0;
      const lastStatus = requestHistory.history[lastIndex].toStatus;

      const newEntry = {
        date: '00/00/0000',
        hour: '00:00',
        fromStatus: lastStatus,
        toStatus: status,
        employee,
      };

      requestHistory.history.push(newEntry);
      requestSum.status = status;
    }
  }
}
