import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ClientRequestsTableComponent } from './features/client/requests-table/requests-table.component';
import { RequestMaintenanceComponent } from './features/client/request-maintenance/request-maintenance.component';
import { authGuard } from './core/auth/authenticator.service';
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
    canActivate: [authGuard],
    component: ClientRequestsTableComponent,
  },
  {
    path: 'cliente/:userId/solicitar-manutencao',
    canActivate: [authGuard],
    component: RequestMaintenanceComponent,
  },
  {
    path: 'cliente/:userId/orcamento/:budgetId',
    canActivate: [authGuard],
    component: BudgetComponent,
  },
  {
    path: 'cliente/:userId/resgate/:id',
    canActivate: [authGuard],
    component: RedeemComponent,
  },
  {
    path: 'cliente/:userId/solicitacao/:requestId',
    canActivate: [authGuard],
    component: RequestDetailsComponent,
  },
  {
    path: 'funcionario/:userId/solicitacao/:requestId',
    canActivate: [authGuard],
    component: RequestDetailsComponent,
  },
  {
    path: 'funcionario/:employeeId/solicitacoes',
    canActivate: [authGuard],
    component: RequestsComponent,
  },
  {
    path: 'funcionario/:employeeId/orcamento/:requestId',
    canActivate: [authGuard],
    component: MakeBudgetComponent,
  },
  {
    path: 'funcionario/:employeeId/categorias',
    canActivate: [authGuard],
    component: CategoriesComponent,
  },
  {
    path: 'funcionario/:employeeId/manutencao/:requestId',
    canActivate: [authGuard],
    component: PerformMaintenanceComponent,
  },
  {
    path: 'funcionario/:employeeId/funcionarios',
    canActivate: [authGuard],
    component: EmployeesListingComponent,
  },
  {
    path: 'funcionario/:employeeId/pedir-receita',
    canActivate: [authGuard],
    component: RequestRevenueComponent,
  },
  {
    path: 'funcionario/:employeeId/receita',
    canActivate: [authGuard],
    component: RevenueComponent,
  },
  {
    path: 'funcionario/:employeeId/receita/categoria',
    canActivate: [authGuard],
    component: RevenueComponent,
  },
  { path: '**', component: LoginComponent },
];
