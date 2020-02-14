import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['admin', 'login']);
  }
}
