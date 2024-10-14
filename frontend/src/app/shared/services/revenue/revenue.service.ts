import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  //Parametros: passar datas no formato "YYYY-MM-DD".
  //Retorno: retorna array de objetos com todas as receitas entre as datas fornecidas.
  getRevenues(startDate: string = '2024-01-01', finalDate: string = new Date().toISOString().split('T')[0]) {
    console.log(startDate + " --- " + finalDate);
  }
}
