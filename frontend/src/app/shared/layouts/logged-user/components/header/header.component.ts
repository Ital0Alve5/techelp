import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ExitIcon } from '@/shared/ui/icons/exit.icon';
import { AuthService } from '@/core/auth/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ExitIcon, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName: string = this.authService.getUserName()() || '';

  constructor(
    public router: Router,
    private authService: AuthService,
  ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate([`/login`]);
  }
}
