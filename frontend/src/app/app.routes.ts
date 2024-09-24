import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ClientPanelComponent } from './features/client-panel/client-panel.component';
import { RequestMaintenanceComponent } from './features/request-maintenance/request-maintenance.component';
import { Authenticator } from './core/auth/authenticator.service';
import { BudgetComponent } from './features/budget/budget.component';

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
];
