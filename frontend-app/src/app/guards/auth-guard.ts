import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem(
    'token'
  );

  console.log('JWT Token:', token);

  if (token && token !== 'undefined') {

    return true;
  }

  router.navigate(['/login']);

  return false;
};
