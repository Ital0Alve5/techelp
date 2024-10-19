import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GuestLayout } from '@/shared/layouts/guest/guest.layout';
import { PopUpComponent } from '@/shared/ui/pop-up/pop-up.component';
import { LoggedUserComponent } from './shared/layouts/logged-user/logged-user.component';
import { BudgetComponent } from './features/client/budget/budget.component';
import { Authenticator } from './core/auth/authenticator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuestLayout, PopUpComponent, LoggedUserComponent, BudgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(public authenticator: Authenticator) {}
  title = 'angular-app';
}
