import { Injectable } from '@angular/core';

import { RequestsService } from '@/shared/services/requests/requests.service';
import { Requests } from '@/shared/types/api/maintenance-requests.type';
import { Employee } from '@/shared/types/employee.type';

@Injectable()
export class confirmBudgetService {
  constructor(private requestsService: RequestsService) {}

  confirmBudget(request: Requests, employee: Employee, budgetValue: string): boolean {
    request.price = budgetValue.replace('R$ ', '');

    this.requestsService.assignEmployeeToRequest(request.id, employee.id);
    this.requestsService.updateStatus(request.id, employee.name, 'Orçada');

    return true;
  }
}
