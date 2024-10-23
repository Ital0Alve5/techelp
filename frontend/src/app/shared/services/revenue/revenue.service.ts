import { Injectable } from '@angular/core';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { deviceCategories } from '@/shared/mock/device-categories.mock';
import { RequestsService } from '../requests/requests.service';
@Injectable()
export class RevenueService {
  constructor(private requestsService: RequestsService) {}

  //Parametros: passar datas no formato "YYYY-MM-DD".
  //Retorno: retorna array de objetos com todas as receitas entre as datas fornecidas separadas por dia.
  getRevenuesByDate(startDate: string = '2024-01-01', finalDate: string = new Date().toISOString().split('T')[0]) {
    const requests = this.requestsService.filterRequestsByDateInterval(startDate, finalDate);

    const result = Object.values(requests).map(({ date, price }) => ({
      date,
      price,
    }));

    return result;
  }

  //Retorna todas as receitas de todos os tempos separadas por categoria.
  getRevenuesByCategory() {
    const categories = [...deviceCategories];
    const result = categories.map((category) => {
      const filteredRequests = maintenanceRequests.filter(({ deviceCategory }) => deviceCategory === category.label);

      const totalPrice = filteredRequests.reduce((sum, { price }) => {
        const numericPrice = parseFloat(price);
        return sum + (isNaN(numericPrice) ? 0 : numericPrice);
      }, 0);

      return {
        deviceCategory: category.label,
        price: totalPrice,
      };
    });

    return result;
  }
}
