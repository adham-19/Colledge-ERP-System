import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../core/services/admin.service";
import { AuthService } from "../../core/services/auth.service";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-admin-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.css"],
})
export class UpdatePasswordComponent implements OnInit {
  // firstTime = true لو المستخدم لسه بيسجل دخول أول مرة (زي firstTimePassword/Body.js الأصلي)
  firstTime = false;

  newPassword = "";
  confirmPassword = "";
  showPassword = false;
  loading = false;
  error = "";

  constructor(
    private adminService: AdminService,
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

    this.adminService
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
          this.router.navigateByUrl("/admin/home");
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
