import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { LoginErrors } from "../../core/models/auth.model";
import { SocketService } from "../../core/services/socket.service";

@Component({
  selector: "app-student-login",
  templateUrl: "./student-login.component.html",
  styleUrls: ["./student-login.component.css"],
})
export class StudentLoginComponent implements OnInit, OnDestroy {
  translate = false;
  username = "";
  password = "";
  showPassword = false;
  loading = false;
  errors: LoginErrors = {};

  private errorsSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    setTimeout(() => (this.translate = true), 1000);

    this.errorsSub = this.authService.errors$.subscribe((errors) => {
      if (errors) {
        this.errors = errors;
        this.loading = false;
        this.username = "";
        this.password = "";
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
      .studentSignIn({
        username: this.username.trim(),
        password: this.password.trim(),
      })
      .subscribe({
        next: (res) => {
          const token = res.token;
          this.socketService.connect(token);
          if (res.result.passwordUpdated) {
            this.router.navigateByUrl("/student/home");
          } else {
            this.router.navigateByUrl("/student/password");
          }
        },
        error: () => {},
      });
  }
}
