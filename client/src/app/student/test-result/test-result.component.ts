import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { EntityColumn } from '../../admin/shared-ui/entity-table/entity-table.component';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css'],
})
export class TestResultComponent implements OnInit {
  department = this.authService.currentUser?.result?.['department'] ?? '';
  year = this.authService.currentUser?.result?.['year'] ?? '';
  section = this.authService.currentUser?.result?.['section'] ?? '';

  results: any[] = [];
  loading = true;
  error = '';

  columns: EntityColumn[] = [
    { key: 'test', label: 'Test' },
    { key: 'subjectName', label: 'Subject' },
    { key: 'marks', label: 'Marks' },
    { key: 'totalMarks', label: 'Total Marks' },
  ];

  constructor(private studentService: StudentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentService
      .getTestResult({ department: this.department, year: this.year, section: this.section })
      .subscribe({
        next: (res) => {
          this.results = res.result;
          this.loading = false;
        },
        error: (err) => {
          this.results = [];
          this.loading = false;
          this.error = err.error?.notestError || err.error?.backendError || 'Something went wrong';
        },
      });
  }
}
