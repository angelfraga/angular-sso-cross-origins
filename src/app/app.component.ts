import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { StorageHubService } from './storage-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = true;
  authenticated$ = new BehaviorSubject(false);

  constructor(private storageHubService: StorageHubService) {
    const referrerURL = document.referrer;

    this.storageHubService.isAuthenticated().subscribe((authenticated) => {
      this.loading = false;
      this.authenticated$.next(authenticated);
    });

    this.authenticated$.pipe(
      filter((authenticated) => !!authenticated)
    ).subscribe(() => {
      if (referrerURL && (referrerURL !== 'http://sso.myapp.com/' && referrerURL !== 'http://sso.myapp.com')) {
        window.location.href = referrerURL;
      } else {
        window.location.href = 'http://client-a.myapp.com';
      }
    });
  }

  login() {
    this.storageHubService.login().pipe(map(() => true)).subscribe(this.authenticated$);
  }

}
