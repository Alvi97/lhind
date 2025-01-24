import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { AppComponent } from './app.component';
import { authGuard } from './guards/auth.guard';
import { loggedInGuardGuard } from './guards/logged-in-guard.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      loadRemote<typeof import('login/Routes')>('login/Routes').then(
        (c) => c!.LoginFormComponent
      ),
    canActivate: [loggedInGuardGuard]

  },
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
  },
];
