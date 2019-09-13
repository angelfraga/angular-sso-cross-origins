import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { CrossStorageClient } from 'cross-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly storage: CrossStorageClient = new CrossStorageClient('http://sso-hub.myapp.com');

  private static readonly isReady$ = new BehaviorSubject(false);

  constructor() {
    from(AuthService.storage.onConnect()).pipe(
      tap(() => console.log('Connected !!')),
    ).subscribe(() => AuthService.isReady$.next(true));
  }

  isAuthenticated(): Observable<boolean> {
    return AuthService.isReady$.pipe(
      filter(ready => !!ready),
      switchMap(() => from(AuthService.storage.get('accessToken'))),
      map((token) => !!token)
    );
  }

  logout(): Observable<any> {
    return AuthService.isReady$.pipe(
      filter(ready => !!ready),
      switchMap(() => from(AuthService.storage.clear()))
    );
  }

  login(): Observable<any> {
    return AuthService.isReady$.pipe(
      filter(ready => !!ready),
      switchMap(() => from(AuthService.storage.set('accessToken', 'mySecretToken')))
    );
  }
}
