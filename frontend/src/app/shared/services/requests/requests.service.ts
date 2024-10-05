import { Injectable } from '@angular/core';
import { RequestStats } from '@/shared/types/request-status.type';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';

@Injectable()
export class RequestsService {
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
}
