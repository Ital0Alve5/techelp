import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';

import { RequestDetailsService } from './services/request-details.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';
import { ClientRequests } from '../requests-table/types/client-requests.type';
import { ClientRequestHistory } from '../requests-table/types/client-request-history.type';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [ArrowRightIcon, RouterLink],
  providers: [RequestDetailsService],
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  requestId: number = Number.parseInt(window.location.pathname.match(/\/solicitacao\/(\d+)/)![1]);

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

  ngOnInit() {
    this.getRequestDetailsByRequestId(this.requestId);
    this.getRequestHistory(this.requestId);
  }
  
  dataHistory = signal<ClientRequestHistory[]>([]);

  constructor(
    public router: Router,
    private requestDetailsService: RequestDetailsService,
    private popupService: PopupService,
  ) {}

  async getRequestHistory(id: number) {
    const success = await this.requestDetailsService.getRequestHistory(id);
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
    const requestHistory = success.data.data as unknown;
    this.dataHistory.set(requestHistory as ClientRequestHistory[]);
  }
  async getRequestDetailsByRequestId(id: number) {
    const success = await this.requestDetailsService.getRequestDetailsByRequestId(id);
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
}
