import { Component } from '@angular/core';
import { ExitIcon } from '@/shared/ui/icons/exit.icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ExitIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
