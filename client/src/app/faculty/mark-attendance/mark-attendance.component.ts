import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../core/services/admin.service";
import { FacultyService } from "../../core/services/faculty.service";
import { Department } from "../../core/models/admin.model";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-mark-attendance",
  templateUrl: "./mark-attendance.component.html",
  styleUrls: ["./mark-attendance.component.css"],
})
export class MarkAttendanceComponent implements OnInit {
  departments: Department[] = [];
  subjects: any[] = [];
  value = { department: "", year: "", section: "" };
  subjectName = "";

  students: any[] = [];
  selectedIds = new Set<string>();

  search = false;
  loading = false;
  error = "";

  constructor(
    private adminService: AdminService,
    private facultyService: FacultyService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.adminService
      .getAllDepartment()
      .subscribe((depts) => (this.departments = depts));
  }

  onSearch(): void {
    this.search = true;
    this.loading = true;
    this.error = "";
    this.selectedIds.clear();

    this.facultyService.getStudent(this.value).subscribe({
      next: (res) => {
        this.students = res.result;
        this.loading = false;
      },
      error: (err) => {
        this.students = [];
        this.loading = false;
        this.error =
          err.error?.noStudentError ||
          err.error?.backendError ||
          "Something went wrong";
      },
    });

    this.adminService
      .getSubject({ department: this.value.department, year: this.value.year })
      .subscribe({
        next: (res) => (this.subjects = res.result),
        error: () => (this.subjects = []),
      });
  }

  toggle(id: string, checked: boolean): void {
    if (checked) this.selectedIds.add(id);
    else this.selectedIds.delete(id);
  }

  isChecked(id: string): boolean {
    return this.selectedIds.has(id);
  }

  markAttendance(): void {
    if (!this.subjectName) {
      this.notificationService.warning(
        "Required Data",
        "Must select a subject first",
      );
      return;
    }
    this.facultyService
      .markAttendance({
        selectedStudents: Array.from(this.selectedIds),
        subjectName: this.subjectName,
        department: this.value.department,
        year: this.value.year,
        section: this.value.section,
      })
      .subscribe({
        next: () => {
          this.notificationService.success(
            "Attendance Marked",
            "The attendance was marked successfully.",
          );
          this.value = { department: "", year: "", section: "" };
          this.subjectName = "";
          this.students = [];
          this.selectedIds.clear();
          this.search = false;
        },
        error: (err) => {
          this.error = err.error?.backendError || "Something went wrong";
        },
      });
  }
}
