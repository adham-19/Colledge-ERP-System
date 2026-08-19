import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../core/services/admin.service";
import { Department } from "../../core/models/admin.model";
import { EntityColumn } from "../shared-ui/entity-table/entity-table.component";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-delete-admin",
  templateUrl: "./delete-admin.component.html",
  styleUrls: ["./delete-admin.component.css"],
})
export class DeleteAdminComponent implements OnInit {
  departments: Department[] = [];
  department = "";
  results: any[] = [];
  searched = false;
  loading = false;
  error = "";

  columns: EntityColumn[] = [
    { key: "name", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
  ];

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllDepartment()
      .subscribe((depts) => (this.departments = depts));
  }

  search(): void {
    this.loading = true;
    this.error = "";
    this.searched = true;
    this.adminService.getAdmin({ department: this.department }).subscribe({
      next: (res) => {
        this.results = res.result;
        this.loading = false;
      },
      error: (err) => {
        this.results = [];
        this.loading = false;
        this.error =
          err.error?.noAdminError ||
          err.error?.backendError ||
          "Something went wrong";
      },
    });
  }

  onDelete(ids: string[]): void {
    if (ids.length === 0) return;
    this.loading = true;
    this.adminService.deleteAdmin(ids).subscribe({
      next: () => {
        this.notificationService.success(
          "Admin Deleted",
          "The admin was deleted successfully.",
        );
        this.search();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.backendError || "Something went wrong";
      },
    });
  }
}
