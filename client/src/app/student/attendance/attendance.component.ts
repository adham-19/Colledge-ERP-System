import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { EntityColumn } from '../../admin/shared-ui/entity-table/entity-table.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  department = this.authService.currentUser?.result?.['department'] ?? '';
  year = this.authService.currentUser?.result?.['year'] ?? '';
  section = this.authService.currentUser?.result?.['section'] ?? '';

  results: any[] = [];
  loading = true;
  error = '';

  columns: EntityColumn[] = [
    { key: 'subjectName', label: 'Subject' },
    { key: 'attended', label: 'Attended' },
    { key: 'total', label: 'Total' },
    { key: 'percentage', label: 'Percentage %' },
  ];

  constructor(private studentService: StudentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentService
      .getAttendance({ department: this.department, year: this.year, section: this.section })
      .subscribe({
        next: (res) => {
          this.results = res.result;
          this.loading = false;
        },
        error: (err) => {
          this.results = [];
          this.loading = false;
          this.error = err.error?.backendError || 'Something went wrong';
        },
      });
  }
}
