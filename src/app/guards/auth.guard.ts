import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const ACCESS_TOKEN = 'access_token';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};
