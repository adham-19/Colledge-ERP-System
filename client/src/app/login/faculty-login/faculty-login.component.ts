import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoginErrors } from '../../core/models/auth.model';

@Component({
  selector: 'app-faculty-login',
  templateUrl: './faculty-login.component.html',
  styleUrls: ['./faculty-login.component.css'],
})
export class FacultyLoginComponent implements OnInit, OnDestroy {
  translate = false;
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  errors: LoginErrors = {};

  private errorsSub?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => (this.translate = true), 1000);

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
      .facultySignIn({ username: this.username.trim(), password: this.password.trim()})
      .subscribe({
        next: (res) => {
          if (res.result.passwordUpdated) {
            this.router.navigateByUrl('/faculty/home');
          } else {
            this.router.navigateByUrl('/faculty/password');
          }
        },
        error: () => {},
      });
  }
}
