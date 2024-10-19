import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonComponent } from '@/shared/ui/button/button.component';
import { CardComponent } from '@/shared/ui/card/card.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';

import { RequestDetailsService } from './services/request-details.service';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [ButtonComponent, CardComponent, ArrowRightIcon, RouterLink],
  providers: [RequestDetailsService],
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  requestId: number = Number.parseInt(window.location.pathname.match(/\/solicitacao\/(\d+)/)![1]);

  requestData = signal(this.requestDetailsService.getRequestDetailsByRequestId(this.requestId));

  constructor(
    public router: Router,
    private requestDetailsService: RequestDetailsService,
  ) {}
}
