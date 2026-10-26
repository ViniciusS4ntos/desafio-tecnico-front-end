import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login';
import { RegisterComponent } from './components/register/register';
import { CartoesComponent } from './components/cartoes/cartoes';
import { UsuariosComponent } from './components/usuarios/usuarios';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cartoes', component: CartoesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];