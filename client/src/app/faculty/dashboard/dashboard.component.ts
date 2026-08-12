import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../core/services/admin.service";
import { Notice } from "../../core/models/admin.model";
import { AuthService } from "../../core/services/auth.service";
import { FacultyService } from "../../core/services/faculty.service";

interface CalendarDay {
  date: number;
  isToday: boolean;
}

@Component({
  selector: "app-faculty-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class FacultyDashboardComponent implements OnInit {
  loading = true;
  notices: Notice[] = [];
  selectedNotice: Notice | null = null;

  classesCount = 0;
  studentsCount = 0;
  subjectsCount = 0;
  testsCount = 0;

  monthLabel = "";
  weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  calendarWeeks: (CalendarDay | null)[][] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private facultyService: FacultyService,
  ) {}

  ngOnInit(): void {
    this.buildCalendar();

    const faculty = this.authService.currentUser?.result;
    const department = faculty?.["department"] ?? "";
    this.facultyService
      .getStudent({
        department,
        year: "",
        section: "",
      })
      .subscribe({
        next: (res) => {
          const classes = new Set(
            res.result.map((student) => `${student.year}-${student.section}`),
          );
          this.classesCount = classes.size;
          this.studentsCount = res.result.length;
        },
        error: () => {
          this.studentsCount = 0;
          this.classesCount = 0;
        },
      });

    this.facultyService
      .getTest({
        department,
        year: "",
        section: "",
      })
      .subscribe({
        next: (res) => {
          this.testsCount = res.result.length;
        },
        error: () => {
          this.testsCount = 0;
        },
      });

    this.facultyService.getSubjects({ department }).subscribe({
      next: (res) => {
        this.subjectsCount = res.result.length;
      },
      error: () => {
        this.subjectsCount = 0;
      },
    });

    this.adminService.getNotice().subscribe({
      next: (res) => {
        this.notices = (res?.result ?? []).filter(
          (n) => n.noticeFor !== "student",
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
