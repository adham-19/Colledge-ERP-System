import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css'],
})
export class StudentHeaderComponent {
  user = this.authService.currentUser;

  constructor(private authService: AuthService, private router: Router) {}

  get firstName(): string {
    return this.user?.result?.['name']?.split(' ')?.[0] ?? '';
  }

  get initial(): string {
    return this.user?.result?.['name']?.charAt(0) ?? 'S';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login/studentlogin');
  }
}
