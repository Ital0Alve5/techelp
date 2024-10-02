import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { CommonModule } from '@angular/common'; 

@Component({
    selector: 'app-make-budget',
    imports: [FormsModule, CommonModule],
    standalone: true,
    templateUrl: './make-budget.component.html',
    styleUrls: ['./make-budget.component.scss'],
    providers: [RequestsService],
  })
  export class MakeBudgetComponent {
    @Input() solicitacao: any = {}; 
    showModal: boolean = false;
    valorOrcamento: number = 0;
    submitted: boolean = false;
    funcionarioLogado = { nome: 'Funcionário Exemplo' };
  
    constructor(private requestsService: RequestsService) {}
  
    openModal() {
      if (this.solicitacao?.currentStatus === 'ABERTO') {
        this.showModal = true;
        this.submitted = false;
      }
    }
  
    cancelar() {
      this.showModal = false;
    }
  
    confirmarOrcamento() {
      if (this.valorOrcamento) {
        const orcamento = {
          valor: this.valorOrcamento,
          funcionario: this.funcionarioLogado.nome,
          data: new Date(),
        };
  
        this.solicitacao.currentStatus = 'ORÇADA';
        this.solicitacao.orcamento = orcamento;
  
        console.log('Orçamento registrado:', this.solicitacao);
  
        this.submitted = true;
        this.showModal = false;
      }
    }
  
    isSubmitted() {
      return this.submitted;
    }
  
    isModalVisible() {
      return this.showModal;
    }
  }  