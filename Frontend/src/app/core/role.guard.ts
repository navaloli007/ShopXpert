import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard = (
  expectedRole: 'admin' | 'customer'
): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const isLoggedIn = auth.isLoggedIn(); // ✅ no double ()
    const userRole = auth.getRole(); // ✅ no double ()

    if (isLoggedIn() && userRole() === expectedRole) {
      return true;
    }

    router.navigateByUrl('/auth/login');
    return false;
  };
};
