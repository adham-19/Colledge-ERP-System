import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../core/services/admin.service";
import { Department } from "../../core/models/admin.model";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-delete-department",
  templateUrl: "./delete-department.component.html",
  styleUrls: ["./delete-department.component.css"],
})
export class DeleteDepartmentComponent implements OnInit {
  departments: Department[] = [];
  department = "";
  loading = false;
  error = "";

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.adminService
      .getAllDepartment()
      .subscribe((depts) => (this.departments = depts));
  }

  submit(): void {
    this.loading = true;
    this.error = "";
    this.adminService
      .deleteDepartment({ department: this.department })
      .subscribe({
        next: () => {
          this.loading = false;
          this.notificationService.success(
            "Department Deleted",
            "The department was deleted successfully.",
          );
          this.department = "";
          this.loadDepartments();
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error?.backendError || "Something went wrong";
        },
      });
  }
}
