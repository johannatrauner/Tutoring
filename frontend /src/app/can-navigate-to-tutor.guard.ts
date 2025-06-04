import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import { inject } from '@angular/core';

export const canNavigateToTutorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (authService.isTutor()) {
    return true;
  } else {
    window.alert('Sie Sind kein Tutor');
  }
  router.navigate(['/home']);
  return false;
};
