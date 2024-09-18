import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ExitIcon } from '@/shared/ui/icons/exit.icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ExitIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate([`/login`]);
  }
}
