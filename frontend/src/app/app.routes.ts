import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SingUpComponent } from './features/sing-up/sing-up.component';
import { ClientPanelComponent } from './features/client-panel/client-panel.component';
import { RequestMaintenanceComponent } from './features/request-maintenance/request-maintenance.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: SingUpComponent,
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
