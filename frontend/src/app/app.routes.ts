import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ClientPanelComponent } from './features/client-panel/client-panel.component';
import { RequestMaintenanceComponent } from './features/request-maintenance/request-maintenance.component';
import { Authenticator } from './core/auth/authenticator.service';
import { BudgetComponent } from './features/budget/budget.component';
import { RescueComponent } from './features/rescue/rescue.component';
import { RequestDetailsComponent } from './features/request-details/request-details.component';
import { RequestsComponent } from './features/employee/requests/requests.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'funcionario/login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: SignUpComponent,
  },
  {
    path: 'cliente/:userId/solicitacoes',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: ClientPanelComponent,
  },
  {
    path: 'cliente/:userId/solicitar-manutencao',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestMaintenanceComponent,
  },
  {
    path: 'cliente/:userId/orcamento/:budgetId',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: BudgetComponent,
  },
  {
    path: 'cliente/:userId/resgate/:id',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RescueComponent,
  },
  {
    path: 'cliente/:userId/solicitacao/:requestId',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestDetailsComponent,
  },
  {
    path: 'funcionario/:employeeId/solicitacoes/abertas',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestsComponent,
  },
];
