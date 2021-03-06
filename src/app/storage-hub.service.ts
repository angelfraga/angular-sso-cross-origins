import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { CrossStorageClient } from 'cross-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageHubService {
  private static readonly storage: CrossStorageClient = new CrossStorageClient('http://sso-hub.myapp.com');

  private static readonly isReady$ = new BehaviorSubject(false);

  constructor() {
    from(StorageHubService.storage.onConnect()).pipe(
      tap(() => console.log('Connected !!')),
    ).subscribe(() => StorageHubService.isReady$.next(true));
  }

  isAuthenticated(): Observable<boolean> {
    return StorageHubService.isReady$.pipe(
      filter(ready => !!ready),
      switchMap(() => from(StorageHubService.storage.get('accessToken'))),
      map((token) => !!token)
    );
  }

  logout(): Observable<any> {
    return StorageHubService.isReady$.pipe(
      filter(ready => !!ready),
      switchMap(() => from(StorageHubService.storage.clear()))
    );
  }

  login(): Observable<any> {
    return StorageHubService.isReady$.pipe(
      filter(ready => !!ready),
      switchMap(() => from(StorageHubService.storage.set('accessToken', 'mySecretToken')))
    );
  }
}
