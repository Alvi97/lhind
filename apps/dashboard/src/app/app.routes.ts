import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      loadRemote<typeof import('login/Routes')>('login/Routes').then(
        (c) => c!.LoginFormComponent
      ),
  },
  {
    path: '',
    component: AppComponent,
  },
];
