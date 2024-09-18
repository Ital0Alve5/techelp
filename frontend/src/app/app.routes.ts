import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ClientPanelComponent } from './features/client-panel/client-panel.component';
import { RequestMaintenanceComponent } from './features/request-maintenance/request-maintenance.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: SignUpComponent,
  },
  {
    path: 'cliente/:userId/solicitacoes',
    component: ClientPanelComponent,
  },
  {
    path: 'cliente/:userId/solicitar-manutencao',
    component: RequestMaintenanceComponent,
  },
];
