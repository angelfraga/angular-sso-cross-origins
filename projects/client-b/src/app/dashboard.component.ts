import { Component } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'app-dashboard',
  template: `
    Welcome to client B
    <button (click)="logout()" > logout </button>
  `
})
export class DashboardComponent {

  constructor(private authService: AuthService) {

  }

  logout() {
    this.authService.logout().subscribe(() => {
      window.location.href = 'http://sso.myapp.com';
    });
  }
}
