import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestLayout } from '@/shared/layouts/guest/guest.layout';
import { PopUpComponent } from '@/shared/ui/pop-up/pop-up.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuestLayout, PopUpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular-app';
}
