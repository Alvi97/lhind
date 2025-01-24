import { Route } from '@angular/router';
import { loggedInGuardGuard } from '../../../dashboard/src/app/guards/logged-in-guard.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login-form/login-form.component').then((m) => m.LoginFormComponent),

  },
];
