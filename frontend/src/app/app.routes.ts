import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ClientRequestsTableComponent } from './features/client/requests-table/requests-table.component';
import { RequestMaintenanceComponent } from './features/client/request-maintenance/request-maintenance.component';
import { Authenticator } from './core/auth/authenticator.service';
import { BudgetComponent } from './features/client/budget/budget.component';
import { RedeemComponent } from './features/client/redeem/redeem.component';
import { RequestDetailsComponent } from './features/client/request-details/request-details.component';
import { RequestsComponent } from './features/employee/requests/requests.component';
import { MakeBudgetComponent } from './features/employee/make-budget/make-budget.component';
import { PerformMaintenanceComponent } from './features/employee/perform-maintenance/perform-maintenance.component';
import { CategoriesComponent } from './features/employee/categories/categories.component';
import { EmployeesListingComponent } from './features/employee/employees-listing/employees-listing.component';
import { RequestRevenueComponent } from './features/employee/request-revenue/request-revenue.component';
import { RevenueComponent } from './features/employee/revenue/revenue.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
    component: ClientRequestsTableComponent,
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
    component: RedeemComponent,
  },
  {
    path: 'cliente/:userId/solicitacao/:requestId',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestDetailsComponent,
  },
  {
    path: 'funcionario/:userId/solicitacao/:requestId',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestDetailsComponent,
  },
  {
    path: 'funcionario/:employeeId/solicitacoes',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestsComponent,
  },
  {
    path: 'funcionario/:employeeId/orcamento/:requestId',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: MakeBudgetComponent,
  },
  {
    path: 'funcionario/:employeeId/categorias',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: CategoriesComponent,
  },
  {
    path: 'funcionario/:employeeId/manutencao/:requestId',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: PerformMaintenanceComponent,
  },
  {
    path: 'funcionario/:employeeId/funcionarios',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: EmployeesListingComponent,
  },
  {
    path: 'funcionario/:employeeId/pedir-receita',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RequestRevenueComponent,
  },
  {
    path: 'funcionario/:employeeId/receita',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RevenueComponent,
  },
  {
    path: 'funcionario/:employeeId/receita/categoria',
    canActivate: [() => inject(Authenticator).checkAuthentication()],
    component: RevenueComponent,
  },
];
