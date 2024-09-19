import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'logged-user-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './logged-user.component.html',
  styleUrl: './logged-user.component.scss',
})
export class LoggedUserComponent {}
