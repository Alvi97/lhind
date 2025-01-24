import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { AppComponent } from './app.component';
import { authGuard } from './guards/auth.guard';
import { loggedInGuardGuard } from './guards/logged-in-guard.guard';
import { DeclarativeComponent } from './features/declarative/declarative.component';

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
    component: DeclarativeComponent,
    canActivate: [authGuard],
  },
];
