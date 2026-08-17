import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoginErrors } from '../../core/models/auth.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  // نفس الـ useState بتوع AdminLogin.js
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  errors: LoginErrors = {};

  private errorsSub?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // نفس useEffect اللي بيسمع لـ store.errors
    this.errorsSub = this.authService.errors$.subscribe((errors) => {
      if (errors) {
        this.errors = errors;
        this.loading = false;
        this.username = '';
        this.password = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.errorsSub?.unsubscribe();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.loading = true;
    this.authService
      .adminSignIn({ username: this.username.trim(), password: this.password })
      .subscribe({
        next: (res) => {
          if (res.result.passwordUpdated) {
            this.router.navigateByUrl('/admin/home');
          } else {
            this.router.navigateByUrl('/admin/update/password');
          }
        },
        // الأخطاء بتتلقط جوا AuthService وبتتعرض عن طريق errors$
        error: () => {},
      });
  }
}
