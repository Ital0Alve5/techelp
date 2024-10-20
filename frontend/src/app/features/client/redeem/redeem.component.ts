import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { RequestsService } from '@/shared/services/requests/requests.service';
import { RedeemService } from './services/redeem.service';

@Component({
  selector: 'app-redeem',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink, ModalComponent],
  providers: [RequestsService],
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss'],
})
export class RedeemComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/resgate\/(\d+)/)![1]);
  isRedeemConfirmationModalOpen = signal(true);
  requestData = signal(this.redeemService.redeemRequestByRequestId(this.requestId));

  constructor(
    private popupService: PopupService,
    private router: Router,
    private requestsService: RequestsService,
    private redeemService: RedeemService,
  ) {}

  openModal() {
    this.isRedeemConfirmationModalOpen.set(false);
  }

  closeModal() {
    this.isRedeemConfirmationModalOpen.set(true);
  }

  confirmRedeem() {
    this.requestsService.updateStatus(this.requestId, this.requestData().employee, 'Aprovada');

    this.closeModal();

    this.router.navigate([`/cliente/${this.userId}/solicitacoes`]);

    this.popupService.addNewPopUp({
      type: Status.Success,
      message: 'Solicitação resgatada com sucesso!',
    });
  }
}
