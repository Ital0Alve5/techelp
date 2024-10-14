import { Injectable } from '@angular/core';
import { maintenanceRequests } from '@/shared/mock/maintenance-requests.mock';
import { Requests } from '@/shared/types/api/maintenance-requests.type';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  //Parametros: passar datas no formato "YYYY-MM-DD".
  //Retorno: retorna array de objetos com todas as receitas entre as datas fornecidas.
  getRevenues(startDate: string = '2024-01-01', finalDate: string = new Date().toISOString().split('T')[0]) {
    let requests: Requests[] = [...maintenanceRequests];
    requests = requests.filter(({ currentStatus }) => currentStatus === 'Paga');

    const startDateComparison = startDate.split('-').join('');
    const finalDateComparison = finalDate.split('-').join('');

    requests = requests.filter(({ date }) => {
      const dateComparison = this.reshapeDate(date);
      return dateComparison >= startDateComparison && dateComparison <= finalDateComparison;
    });

    const result = requests.map(({ date, price, deviceCategory }) => ({
      date,
      price,
      deviceCategory
    }));

    console.log(result);
  }

  private reshapeDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}${month}${day}`;
  }
}
