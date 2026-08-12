import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from '../../core/services/admin.service';
import { Notice } from '../../core/models/admin.model';

interface CalendarDay {
  date: number;
  isToday: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loading = true;

  counts = { faculty: 0, student: 0, admin: 0, department: 0 };
  notices: Notice[] = [];
  selectedNotice: Notice | null = null;

  // ==== تقويم بسيط للشهر الحالي، بديل react-calendar ====
  monthLabel = '';
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  calendarWeeks: (CalendarDay | null)[][] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.buildCalendar();

    // نفس الـ useEffect بتاع AdminHome.js اللي بيعمل dispatch لكل الـ getAll* actions
    forkJoin({
      student: this.adminService.getAllStudent(),
      faculty: this.adminService.getAllFaculty(),
      admin: this.adminService.getAllAdmin(),
      department: this.adminService.getAllDepartment(),
      notice: this.adminService.getNotice(),
    }).subscribe({
      next: ({ student, faculty, admin, department, notice }) => {
        this.counts = {
          student: student?.length ?? 0,
          faculty: faculty?.length ?? 0,
          admin: admin?.length ?? 0,
          department: department?.length ?? 0,
        };
        this.notices = notice?.result ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  private buildCalendar(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    this.monthLabel = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
