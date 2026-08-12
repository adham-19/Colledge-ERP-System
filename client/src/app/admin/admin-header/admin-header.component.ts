import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  user = this.authService.currentUser;

  constructor(private authService: AuthService, private router: Router) {}

  get firstName(): string {
    return this.user?.result?.['name']?.split(' ')?.[0] ?? '';
  }

  get initial(): string {
    return this.user?.result?.['name']?.charAt(0) ?? 'A';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login/adminlogin');
  }
}
