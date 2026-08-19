import { Component } from "@angular/core";
import {
  FacultyService,
  CreateTestPayload,
} from "../../core/services/faculty.service";
import { AuthService } from "../../core/services/auth.service";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-create-test",
  templateUrl: "./create-test.component.html",
  styleUrls: ["./create-test.component.css"],
})
export class CreateTestComponent {
  loading = false;
  error = "";
  department = this.authService.currentUser?.result?.["department"] ?? "";

  value: CreateTestPayload = {
    test: "",
    subjectCode: "",
    department: this.department,
    year: "",
    section: "",
    totalMarks: "",
    date: "",
  };

  constructor(
    private facultyService: FacultyService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  submit(): void {
    this.loading = true;
    this.error = "";
    this.facultyService.createTest(this.value).subscribe({
      next: () => {
        this.loading = false;
        this.notificationService.success(
          "Test Created",
          "The test was created successfully.",
        );
        this.clear();
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.testError ||
          err.error?.backendError ||
          "Something went wrong";
      },
    });
  }

  clear(): void {
    this.value = {
      test: "",
      subjectCode: "",
      department: this.department,
      year: "",
      section: "",
      totalMarks: "",
      date: "",
    };
    this.error = "";
  }
}
