import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import { inject } from '@angular/core';

export const canNavigateToLoggedUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    window.alert('Sie müssen sich anmelden, um auf diese Seite zuzugreifen!');
  }
  router.navigate(['/login']);
  return false;
};
