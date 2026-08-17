import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.css",
})
export class ForgotPasswordComponent implements OnInit {
  email = "";
  role = "";

  roleColor = "";

  loading = false;

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
    this.loading = true;

    this.authService.forgotPassword(this.email, this.role).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.showPopup("Reset password link sent to your email.", false);
      },

      error: (err) => {
        this.loading = false;

        if (err.status === 404) {
          this.showPopup("No account was found with this email address.", true);
        } else if (err.status === 400) {
          this.showPopup(
            err.error?.message || "Please check your information.",
            true,
          );
        } else {
          this.showPopup("Something went wrong. Please try again later.", true);
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
    } else {
      this.email = "";
    }
  }
}
