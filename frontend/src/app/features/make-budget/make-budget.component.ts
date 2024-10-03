import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { CommonModule } from '@angular/common';
import { Requests } from '@/shared/types/api/maintenance-requests.type';

@Component({
  selector: 'app-make-budget',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './make-budget.component.html',
  styleUrls: ['./make-budget.component.scss'],
  providers: [RequestsService],
})
export class MakeBudgetComponent implements OnInit {
  solicitacao!: Requests;
  requestId!: number;
  showModal: boolean = false;
  valorOrcamento: number = 0;
  submitted: boolean = false;
  funcionarioLogado = { nome: 'Funcionário Exemplo' };
  notFoundMessage: string = '';
  successMessage: string = '';

  constructor(private requestsService: RequestsService) {
    this.requestId = this.getRequestIdFromUrl();
  }

  ngOnInit() {
    this.searchRequest();
  }

  getRequestIdFromUrl(): number {
    const pathSegments = location.pathname.split('/');
    return parseInt(pathSegments[pathSegments.length - 1].trim());
  }

  searchRequest() {
    const maintenanceRequests = this.requestsService.getRequest('Aberta');
    this.solicitacao = maintenanceRequests.find((request) => request.id === this.requestId)!;

    if (!this.solicitacao) {
      this.notFoundMessage = 'Solicitação não encontrada';
    } else {
      this.notFoundMessage = '';
    }
  }

  openModal() {
    if (this.solicitacao?.currentStatus === 'ABERTO') {
      this.showModal = true;
      this.submitted = false;
      this.successMessage = '';
    }
  }

  cancelar() {
    this.showModal = false;
    this.submitted = false;
    this.successMessage = '';
  }

  confirmarOrcamento() {
    if (this.valorOrcamento) {
      const orcamento = {
        valor: this.valorOrcamento,
        funcionario: this.funcionarioLogado.nome,
        data: new Date(),
      };

      this.solicitacao.currentStatus = 'ORÇADA';
      this.solicitacao.price = orcamento.valor.toString();
      console.log('Orçamento registrado:', this.solicitacao);
      this.successMessage = 'Orçamento registrado com sucesso!';
      this.submitted = true;
      this.showModal = false;
    } else {
      console.log('Valor de orçamento inválido');
    }
  }

  isSubmitted() {
    return this.submitted;
  }

  isModalVisible() {
    return this.showModal;
  }
}
