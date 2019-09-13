import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {

    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => !authenticated ? (window.location.href = 'http://sso.myapp.com') : null),
    );
  }
}
