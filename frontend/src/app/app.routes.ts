import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SingUpComponent } from './features/sing-up/sing-up.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: SingUpComponent,
  },

];
