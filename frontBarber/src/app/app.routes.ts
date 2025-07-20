import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'admin/servicios',
    loadComponent: () => import('./pages/admin/servicios/servicios.page').then( m => m.ServiciosPage)
  },
  {
    path: 'admin/barberos',
    loadComponent: () => import('./pages/admin/barberos/barberos.page').then( m => m.BarberosPage)
  },
  {
    path: 'admin/reservas',
    loadComponent: () => import('./pages/admin/reservas/reservas.page').then( m => m.ReservasPage)
  }



];
