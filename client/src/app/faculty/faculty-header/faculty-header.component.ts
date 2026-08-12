import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-faculty-header',
  templateUrl: './faculty-header.component.html',
  styleUrls: ['./faculty-header.component.css'],
})
export class FacultyHeaderComponent {
  user = this.authService.currentUser;

  constructor(private authService: AuthService, private router: Router) {}

  get firstName(): string {
    return this.user?.result?.['name']?.split(' ')?.[0] ?? '';
  }

  get initial(): string {
    return this.user?.result?.['name']?.charAt(0) ?? 'F';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login/facultylogin');
  }
}
