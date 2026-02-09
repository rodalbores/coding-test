import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'sensors',
        loadComponent: () => import('./features/sensors/sensors.page').then((m) => m.SensorsPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.page').then((m) => m.SettingsPage),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
