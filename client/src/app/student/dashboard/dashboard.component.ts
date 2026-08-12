import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../core/services/admin.service";
import { AuthService } from "../../core/services/auth.service";
import { Notice } from "../../core/models/admin.model";
import { StudentService } from "../../core/services/student.service";

interface CalendarDay {
  date: number;
  isToday: boolean;
}

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class StudentDashboardComponent implements OnInit {
  loading = true;
  notices: Notice[] = [];
  selectedNotice: Notice | null = null;
  year = this.authService.currentUser?.result?.["year"] ?? "—";
  subjectsCount = 0;
  testsCount = 0;
  attendancePercentage = 0;

  monthLabel = "";
  weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  calendarWeeks: (CalendarDay | null)[][] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.buildCalendar();

    const student = this.authService.currentUser?.result;
    this.subjectsCount = student?.["subjects"]?.length ?? 0;
    const department =
      this.authService.currentUser?.result?.["department"] ?? "";
    const year = this.authService.currentUser?.result?.["year"] ?? "";
    const section = this.authService.currentUser?.result?.["section"] ?? "";

    this.studentService
      .getTestResult({
        department,
        year,
        section,
      })
      .subscribe({
        next: (res) => {
          this.testsCount = Array.isArray(res.result) ? res.result.length : 0;
        },

        error: () => {
          this.testsCount = 0;
        },
      });

    this.studentService
      .getAttendance({
        department,
        year,
        section,
      })
      .subscribe({
        next: (res) => {
          const attendance = res.result ?? [];

          const attended = attendance.reduce(
            (sum: number, item: any) => sum + Number(item.attended || 0),
            0,
          );

          const total = attendance.reduce(
            (sum: number, item: any) => sum + Number(item.total || 0),
            0,
          );

          this.attendancePercentage =
            total === 0 ? 0 : Math.round((attended / total) * 100);
        },

        error: () => {
          this.attendancePercentage = 0;
        },
      });

    this.adminService.getNotice().subscribe({
      next: (res) => {
        this.notices = (res?.result ?? []).filter(
          (n) => n.noticeFor !== "faculty",
        );
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  private buildCalendar(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    this.monthLabel = today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (CalendarDay | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => ({
        date: i + 1,
        isToday: i + 1 === today.getDate(),
      })),
    ];

    const weeks: (CalendarDay | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    this.calendarWeeks = weeks;
  }

  openNotice(notice: Notice): void {
    this.selectedNotice = notice;
  }

  closeNotice(): void {
    this.selectedNotice = null;
  }
}
