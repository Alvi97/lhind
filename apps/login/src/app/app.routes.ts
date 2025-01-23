import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login-form/login-form.component').then((m) => m.LoginFormComponent),
  },
];
