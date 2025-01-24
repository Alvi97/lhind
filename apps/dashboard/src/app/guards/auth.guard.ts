import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@lhind/data-access-user';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const userService = inject(UserService);
  const router = inject(Router);


  if (!userService.currentUser) {
    router.navigate(['/login']);
    return false;
  }


  return true;
};