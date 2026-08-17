import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { Route, Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.css",
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  role: string | null = null;

  newPassword = "";
  confirmPassword = "";

  showNewPassword = false;
  showConfirmPassword = false;

  loading = false;

  roleColor = "";

  showSuccessPopup = false;
  popupMessage = "";
  popupIsError = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.token = params.get("token");
      this.role = params.get("role");

      if (this.role === "faculty") {
        this.roleColor = "var(--role-faculty)";
      } else if (this.role === "admin") {
        this.roleColor = "var(--role-admin)";
      } else if (this.role === "student") {
        this.roleColor = "var(--role-student)";
      }
    });
  }

  submit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.showPopup("Passwords do not match.", true);
      return;
    }

    if (!this.token || !this.role) {
      this.showPopup("This reset link is invalid.", true);
      return;
    }

    this.loading = true;

    this.authService
      .resetPassword(this.token, this.newPassword, this.role)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          this.showPopup(
            res.message || "Your password has been reset successfully.",
          );
        },

        error: (error) => {
          this.loading = false;

          if (error.status === 400) {
            this.showPopup(
              error.error?.message || "Invalid or expired reset link.",
              true,
            );
          } else {
            this.showPopup(
              "Something went wrong. Please try again later.",
              true,
            );
          }
        },
      });
  }

  showPopup(message: string, isError: boolean = false): void {
    this.showSuccessPopup = true;
    this.popupMessage = message;
    this.popupIsError = isError;
  }

  closeSuccessPopup(redirect: boolean = false): void {
    this.showSuccessPopup = false;
    
    if (redirect) {
      this.router.navigateByUrl(`/login/${this.role}login`);
    }
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
