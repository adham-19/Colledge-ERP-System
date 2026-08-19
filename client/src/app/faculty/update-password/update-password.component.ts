import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FacultyService } from "../../core/services/faculty.service";
import { AuthService } from "../../core/services/auth.service";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-faculty-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.css"],
})
export class FacultyUpdatePasswordComponent implements OnInit {
  firstTime = false;
  newPassword = "";
  confirmPassword = "";
  showPassword = false;
  loading = false;
  error = "";

  constructor(
    private facultyService: FacultyService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.firstTime = this.route.snapshot.data["firstTime"] === true;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  update(): void {
    this.loading = true;
    this.error = "";
    const email = this.authService.currentUser?.result?.["email"] ?? "";

    this.facultyService
      .updatePassword({
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        email,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.notificationService.success(
            "Password Updated",
            "The password was updated successfully.",
          );
          this.router.navigateByUrl("/faculty/home");
        },
        error: (err) => {
          this.loading = false;
          this.newPassword = "";
          this.confirmPassword = "";
          this.error =
            err.error?.mismatchError ||
            err.error?.backendError ||
            "Something went wrong";
        },
      });
  }
}
