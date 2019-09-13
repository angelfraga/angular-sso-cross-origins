import { Component } from '@angular/core';

import { CrossStorageHub } from 'cross-storage';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent {
  constructor() {
    CrossStorageHub.init([
      { origin: /client-a.myapp.com/, allow: ['get', 'clear'] },
      { origin: /client-b.myapp.com/, allow: ['get', 'clear'] },
      { origin: /sso.myapp.com/, allow: ['get', 'set'] }
    ]);
  }
}
