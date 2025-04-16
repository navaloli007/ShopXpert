// app/app.config.ts
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './customer/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // Customer Routes
  {
    path: 'customer',
    canActivate: [roleGuard('customer')],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'products',
        loadComponent: () =>
          import('./customer/products-list/products-list.component').then(
            (m) => m.ProductsListComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./customer/cart/cart.component').then((m) => m.CartComponent),
      },
      // Add others similarly
    ],
  },

  // Admin Routes
  {
    path: 'admin',
    canActivate: [roleGuard('admin')],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'products',
        loadComponent: () =>
          import('./admin/products-table/products-table.component').then(
            (m) => m.ProductsTableComponent
          ),
      },
      // Add others similarly
    ],
  },
];

export const appConfig = [provideRouter(routes)];
