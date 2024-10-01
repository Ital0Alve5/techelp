import { Injectable } from '@angular/core';
import { RequestStats } from '@/shared/types/request-status.type';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  //Devolve array de solicitações. Sem ennhum parametro, devolve todas as solicitações existentes,
  //com os parametros, devolve apenas as solicitações que tem o status ou funcionario envolvido.
  getRequest(wantedStatus?: RequestStats, wantedEmployeeId?: number): Requests[] {
    let requests: Requests[] = [];

    if (wantedStatus) {
      const requestsWithStatus: Requests[] = maintenanceRequests.filter(
        ({ currentStatus }) => currentStatus === wantedStatus,
      );
      requests = [...requestsWithStatus];
    }

    if (wantedEmployeeId) {
      const requestsWithEmployee: Requests[] = maintenanceRequests.filter(
        ({ employeeId }) => employeeId === wantedEmployeeId,
      );
      requests = [...requestsWithEmployee];
    }

    if (!wantedEmployeeId && !wantedStatus) {
      requests = maintenanceRequests;
    }

    return requests;
  }
}
