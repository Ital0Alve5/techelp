import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TesteComponent } from '@/features/teste/teste.component';
import { GuestLayout } from '@/shared/layouts/guest/guest.layout';
import { LoginComponent } from '@/features/login/login.component';
import { ClientPanelComponent } from '@/features/client-panel/client-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TesteComponent, GuestLayout, LoginComponent, ClientPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular-app';
}
