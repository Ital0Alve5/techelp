import { Injectable } from '@angular/core';

import { RequestsService } from '@/shared/services/requests/requests.service';
import { Requests } from '@/shared/types/api/maintenance-requests.type';

@Injectable()
export class confirmBudgetService {
  constructor(private requestsService: RequestsService) {}

  confirmBudget(request: Requests, employeeName: string, budgetValue: string): boolean {
    request.price = budgetValue.replace('R$ ', '');

    this.requestsService.updateStatus(request.id, employeeName, 'Orçada');

    console.log(request);
    return true;
  }
}
