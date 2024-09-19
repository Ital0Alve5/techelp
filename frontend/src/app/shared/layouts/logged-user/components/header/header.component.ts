import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ExitIcon } from '@/shared/ui/icons/exit.icon';
import { Authenticator } from '@/core/auth/authenticator.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ExitIcon, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public router: Router,
    private authenticator: Authenticator,
  ) {}

  onLogout() {
    this.authenticator.authenticate(false);
    this.router.navigate([`/login`]);
  }
}
