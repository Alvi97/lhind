import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LoginFormComponent } from './app/login-form/login-form.component';

bootstrapApplication(LoginFormComponent, appConfig).catch((err) =>
  console.error(err)
);
