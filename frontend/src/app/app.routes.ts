import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ClientPanelComponent } from './features/client-panel/client-panel.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: LoginComponent,
  },
  {
    path: 'cliente',
    component: ClientPanelComponent,
  },
];
