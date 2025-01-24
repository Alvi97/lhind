import { Route } from '@angular/router';
import { LoginFormComponent } from 'login/Routes';
import { authGuard } from '../../../../dashboard/src/app/guards/auth.guard';

export const remoteRoutes: Route[] = [
  { path: '', component: LoginFormComponent,
  },
];
