import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "../../core/services/admin.service";
import { StudentService } from "../../core/services/student.service";
import { AuthService } from "../../core/services/auth.service";
import { Department } from "../../core/models/admin.model";
import { fileToBase64 } from "../../core/utils/file-to-base64";

@Component({
  selector: "app-student-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.css"],
})
export class StudentProfileUpdateComponent implements OnInit {
  user = this.authService.currentUser?.result;
  departments: Department[] = [];
  loading = false;
  error = "";

  value = {
    name: this.user?.["name"] ?? "",
    dob: this.user?.["dob"] ?? "",
    department: this.user?.["department"] ?? "",
    contactNumber: this.user?.["contactNumber"] ?? "",
    avatar: this.user?.["avatar"] ?? "",
    batch: this.user?.["batch"] ?? "",
    year: this.user?.["year"] ?? "",
    motherName: this.user?.["motherName"] ?? "",
    fatherName: this.user?.["fatherName"] ?? "",
    fatherContactNumber: this.user?.["fatherContactNumber"] ?? "",
    section: this.user?.["section"] ?? "",
    email: this.user?.["email"] ?? "",
  };

  constructor(
    private adminService: AdminService,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllDepartment()
      .subscribe((depts) => (this.departments = depts));
  }

  async onAvatarChange(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.value.avatar = await fileToBase64(file);
  }

  submit(): void {
    const allEmpty = Object.values(this.value).every((v) => v === "");
    if (allEmpty) {
      alert("Enter atleast one value");
      return;
    }

    this.loading = true;
    this.error = "";
    this.studentService.updateProfile(this.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.updateCurrentUser(res);
        this.router.navigateByUrl("/student/profile");
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.backendError || "Something went wrong";
      },
    });
  }

  cancel(): void {
    this.router.navigateByUrl("/student/profile");
  }
}
