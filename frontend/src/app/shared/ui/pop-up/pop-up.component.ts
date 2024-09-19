import { Component } from '@angular/core';

import { PopupService } from '@/shared/services/pop-up/pop-up.service';

import { WarningIcon } from '../icons/warning.icon';
import { SuccessIcon } from '../icons/success.icon';
import { Status } from './enum/status.enum';
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [WarningIcon, SuccessIcon],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent {
  status = Status;

  constructor(public popUpService: PopupService) {}
}
