import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../core/services/admin.service";
import { Department } from "../../core/models/admin.model";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-add-subject",
  templateUrl: "./add-subject.component.html",
  styleUrls: ["./add-subject.component.css"],
})
export class AddSubjectComponent implements OnInit {
  departments: Department[] = [];
  loading = false;
  error = "";

  value: any = this.emptyValue();

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllDepartment()
      .subscribe((depts) => (this.departments = depts));
  }

  private emptyValue() {
    return {
      subjectName: "",
      subjectCode: "",
      department: "",
      totalLectures: "",
      year: "",
    };
  }

  submit(): void {
    this.loading = true;
    this.error = "";
    this.adminService.addSubject(this.value).subscribe({
      next: () => {
        this.loading = false;
        this.notificationService.success(
          "Subject Added",
          "The subject was added successfully.",
        );
        this.clear();
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.subjectError ||
          err.error?.backendError ||
          "Something went wrong";
      },
    });
  }

  clear(): void {
    this.value = this.emptyValue();
    this.error = "";
  }
}
