import { Component } from '@angular/core';
import { CardComponent } from '@/shared/ui/card/card.component';
import { AuthTypeComponent } from '@/shared/ui/auth-type/auth-type.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { UserIcon } from '@/shared/ui/icons/user.icon';
import { LockIcon } from '@/shared/ui/icons/lock.icon';
import { SelectComponent } from '@/shared/ui/select/select.component';

@Component({
  selector: 'app-request-maintenance',
  standalone: true,
  imports: [CardComponent, AuthTypeComponent, TextareaComponent, ButtonComponent, UserIcon, LockIcon, SelectComponent],
  templateUrl: './request-maintenance.component.html',
  styleUrls: ['./request-maintenance.component.scss'],
})
export class RequestMaintenanceComponent {}
