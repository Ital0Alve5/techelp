import { Injectable } from '@angular/core';
import { RequestStats } from '@/shared/types/request-status.type';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { ClientRequests } from '@/features/client/requests-table/types/client-requests.type';
@Injectable()
export class RequestsService {
  updateStatus(requestId: number, employee: string, status: RequestStats, rejectReason: string = '') {
    const requestFound = maintenanceRequests.find(({ id }) => id === requestId);

    if (!requestFound) return;

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

  sortDateDescendingOrder(requests: ClientRequests[] | Requests[]): ClientRequests[] | Requests[] {
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

  getRequestById(requestId: number): Requests | undefined {
    return maintenanceRequests.find((request) => request.id === requestId);
  }
  //Devolve array de solicitações. Sem nennhum parametro, devolve todas as solicitações existentes,
  //com os parametros, devolve apenas as solicitações que tem o status ou funcionario envolvido.
  getRequest(wantedStatus?: RequestStats, wantedEmployeeId?: number): Requests[] {
    let requests: Requests[] = [...maintenanceRequests];

    if (wantedEmployeeId) {
      requests = requests.filter(({ employeeId }) => employeeId === wantedEmployeeId);
    }

    if (wantedStatus) {
      requests = requests.filter(({ currentStatus }) => currentStatus === wantedStatus);
    }

    return this.sortDateDescendingOrder(requests) as Requests[];
  }

  filterAll(employeeId: number) {
    return maintenanceRequests.filter((request) => {
      if (request.currentStatus !== 'Redirecionada') return true;
      else if (request.employeeId === employeeId) return true;
      return false;
    });
  }

  filterToday() {
    const today = new Date().toISOString().split('T')[0];
    return maintenanceRequests.filter((req) => req.date === today && req.currentStatus === 'Aberta');
  }

  filterOpenRequests() {
    return maintenanceRequests.filter((req) => req.currentStatus === 'Aberta');
  }

  filterRequestsByDateInterval(startDate: string, endDate: string) {
    return maintenanceRequests.filter((request) => this.isDateInRange(request.date, startDate, endDate));
  }

  filterByRequestsByDateAndEmployee(employeeId: number, dates: { startDate: string; endDate: string }) {
    return this.filterAll(employeeId).filter((req) => this.isDateInRange(req.date, dates.startDate, dates.endDate));
  }

  isDateInRange(date: string, startDate: string, endDate: string): boolean {
    function parseData(date: string) {
      if (date.includes('/')) {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
      }
      return date;
    }

    return parseData(date) >= parseData(startDate) && parseData(date) <= parseData(endDate);
  }
}
