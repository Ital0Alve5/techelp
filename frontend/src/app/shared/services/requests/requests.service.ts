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
  getRequest(wantedStatus?: RequestStats, wantedEmployee?: string): Requests[] {
    let requests: Requests[] = [];

    if (wantedStatus) {
      const requestsWithStatus: Requests[] = maintenanceRequests.filter(
        ({ currentStatus }) => currentStatus === wantedStatus,
      );
      requests = [...requestsWithStatus];
    }

    if (wantedEmployee) {
      const requestsWithEmployee: Requests[] = maintenanceRequests.filter(({ history }) =>
        history.some((record) => record.employee === wantedEmployee),
      );
      requests = [...requestsWithEmployee];
    }

    if (!wantedEmployee && !wantedStatus) {
      requests = maintenanceRequests;
    }

    return requests;
  }
}
