import { Injectable } from '@angular/core';
import { RequestStats } from '@/shared/types/request-status.type';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ClientRequests } from '@/features/client/requests-table/types/client-requests.type';
@Injectable()
export class RequestsService {
  sortDateDescendingOrder(requests: ClientRequests[]) {
    return requests.sort((request, previousRequest) => {
      const formattedRequestDate = `${request.date} ${request.hour}`;
      const formatPreviousRequestDate = `${previousRequest.date} ${previousRequest.hour}`;

      if (formattedRequestDate > formatPreviousRequestDate) return -1;
      else if (formattedRequestDate < formatPreviousRequestDate) return 1;
      else return 0;
    });
  }

  getRequestsByClientId(clientId: number) {
    return this.sortDateDescendingOrder(
      maintenanceRequests
        .filter((request) => request.userId === clientId)
        .map((request) => {
          return {
            id: request.id,
            userId: request.userId,
            date: request.date,
            hour: request.hour,
            deviceDescription: request.deviceDescription,
            currentStatus: request.currentStatus,
          };
        }),
    );
  }
  //Devolve array de solicitações. Sem ennhum parametro, devolve todas as solicitações existentes,
  //com os parametros, devolve apenas as solicitações que tem o status ou funcionario envolvido.
  getRequest(wantedStatus?: RequestStats, wantedEmployeeId?: number): Requests[] {
    let requests: Requests[] = [...maintenanceRequests];

    if (wantedEmployeeId) {
      requests = requests.filter(({ employeeId }) => employeeId === wantedEmployeeId);
    }

    if (wantedStatus) {
      requests = requests.filter(({ currentStatus }) => currentStatus === wantedStatus);
    }

    return requests;
  }

  filterAll() {
    const requests: Requests[] = [...maintenanceRequests];

    return requests;
  }

  isDateInRange(date: string, startDate: string, endDate: string): boolean {
    function parseDate(date: string): Date {
      const [day, month, year] = date.split('/').map(Number);
      return new Date(year, month - 1, day);
    }

    return parseDate(date) >= parseDate(startDate) && parseDate(date) <= parseDate(endDate);
  }

  filterToday() {
    const requests: Requests[] = [...maintenanceRequests];

    const today = new Date().toISOString().split('T')[0];
    return requests.filter((req) => req.date === today);
  }

  filterByDate(dates: { startDate: string; endDate: string }) {
    const requests: Requests[] = [...maintenanceRequests];

    return requests.filter((req) => this.isDateInRange(req.date, dates.startDate, dates.endDate));
  }
}
