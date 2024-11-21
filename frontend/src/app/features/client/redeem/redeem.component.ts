import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { RedeemService } from './services/redeem.service';
import { ClientRequests } from '../requests-table/types/client-requests.type';
import { ConverterService } from '@/shared/services/utils/converter.service';


@Component({
  selector: 'app-redeem',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent],
  providers: [RequestsService, RedeemService],
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss'],
})
export class RedeemComponent implements OnInit{
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/resgate\/(\d+)/)![1]);

  isRedeemConfirmationModalOpen = signal(true);

  requestData = signal<ClientRequests>({
    id: 0,
    categoryName: '',
    deviceDescription: '',
    issueDescription: '',
    budget: 0,
    orientation: null,
    rejectReason: null,
    status: '',
    lastEmployee: null,
    date: '',
    hour: '',
  });

  constructor(
    private popupService: PopupService,
    private router: Router,
    private redeemService: RedeemService,
    private converterService: ConverterService,
  ) {}

  ngOnInit(): void {
    this.getRequestDetailsByRequestId();
  }

  async getRequestDetailsByRequestId() {
    const success = await this.redeemService.redeemRequestByRequestId(this.requestId);
    if (!success?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
       return;
    }

    if ('errors' in success.data) {
      Object.values(success.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
    const maintenanceRequestDetails = success.data.data as unknown;
    this.requestData.set(maintenanceRequestDetails as ClientRequests);
  }

  openModal() {
    this.isRedeemConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isRedeemConfirmationModalOpen.set(true);
  }

  async confirmRedeem() {
    try {
      const response = await this.redeemService.redeemRequest(this.requestId);

      if (!response?.data) {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: `Erro ao resgatar solicitação: ${response?.data.message || 'Erro desconhecido'}`,
        });
        return;
      }

      if ('errors' in response.data) {
        Object.values(response.data.errors).forEach((error) => {
          this.popupService.addNewPopUp({
            type: Status.Error,
            message: error,
          });
        });
        return;
      }

      this.popupService.addNewPopUp({
        type: Status.Success,
        message: 'Solicitação resgatada com sucesso!',
      });

      this.closeModal();
      this.router.navigate([`/cliente/solicitacoes`]);
    } catch (error) {
      console.error('Erro ao resgatar solicitação:', error);
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Erro inesperado ao resgatar a solicitação.',
      });
    }
  }
  convertCurrency(value: number | null){
    if(value !== null){
      return this.converterService.convertFloatToCurrency(value);
    }
    return null;
  }
}
