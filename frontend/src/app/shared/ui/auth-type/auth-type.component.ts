import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-auth-type',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './auth-type.component.html',
  styleUrl: './auth-type.component.scss',
})
export class AuthTypeComponent {}
