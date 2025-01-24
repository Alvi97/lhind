import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@lhind/data-access-user';

export const loggedInGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.currentUser) {
    router.navigate(['']);
    return false;
  }

  return true;
}