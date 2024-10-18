import { Injectable } from '@angular/core';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { deviceCategories } from '@/shared/mock/device-categories.mock';
@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  //Parametros: passar datas no formato "YYYY-MM-DD".
  //Retorno: retorna array de objetos com todas as receitas entre as datas fornecidas separadas por dia.
  getRevenuesByDate(startDate: string = '2024-01-01', finalDate: string = new Date().toISOString().split('T')[0]) {
    const startDateComparison = startDate.split('-').join('');
    const finalDateComparison = finalDate.split('-').join('');

    const sameDate: { [date: string]: number } = {};

    maintenanceRequests.forEach(({ history, price }) => {
      history.forEach(({ date, toStatus }) => {
        if (toStatus === 'Paga') {
          const dateComparison = this.reshapeDate(date);
          if (dateComparison >= startDateComparison && dateComparison <= finalDateComparison) {
            const numericPrice = parseFloat(price);
            if (!sameDate[date]) {
              sameDate[date] = 0;
            }
            sameDate[date] += numericPrice;
          }
        }
      });
    });

    const result = Object.entries(sameDate).map(([date, price]) => ({
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

  private reshapeDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}${month}${day}`;
  }
}
