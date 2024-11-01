import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ExitIcon } from '@/shared/ui/icons/exit.icon';
import { AuthService } from '@/core/auth/auth-service.service';

import { registeredUsersMock } from '@/shared/mock/registered-users.mock';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ExitIcon, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userId: number = JSON.parse(localStorage.getItem('userId')!);
  userName: string = '';

  constructor(
    public router: Router,
    private authService: AuthService,
  ) {
    registeredUsersMock.forEach((user) => {
      if (user.id === this.userId) this.userName = user.name;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([`/login`]);
  }
}
