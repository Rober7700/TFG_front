import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../core/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
 
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);
  if (tokenService.isLogged) {
    if (tokenService.isTokenExpirado()) {
      tokenService.clear();
      router.navigate(['']);
      return false;
    }
    return true;
  }
  router.navigate(['']);
  return false;
};