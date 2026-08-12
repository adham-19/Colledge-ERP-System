import { Component } from '@angular/core';
import { FacultyService } from '../../core/services/faculty.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-upload-marks',
  templateUrl: './upload-marks.component.html',
  styleUrls: ['./upload-marks.component.css'],
})
export class UploadMarksComponent {
  department = this.authService.currentUser?.result?.['department'] ?? '';
  value = { year: '', section: '', test: '' };
  tests: any[] = [];

  students: any[] = [];
  marksMap: Record<string, string> = {};

  search = false;
  loading = false;
  error = '';

  constructor(private facultyService: FacultyService, private authService: AuthService) {}

  onYearOrSectionChange(): void {
    if (this.value.year && this.value.section) {
      this.facultyService
        .getTest({ department: this.department, year: this.value.year, section: this.value.section })
        .subscribe((res) => (this.tests = res.result));
    }
  }

  onSearch(): void {
    this.search = true;
    this.loading = true;
    this.error = '';
    this.facultyService
      .getStudent({ department: this.department, year: this.value.year, section: this.value.section })
      .subscribe({
        next: (res) => {
          this.students = res.result;
          this.loading = false;
        },
        error: (err) => {
          this.students = [];
          this.loading = false;
          this.error = err.error?.noStudentError || err.error?.backendError || 'Something went wrong';
        },
      });
  }

  onMarkChange(id: string, value: string): void {
    this.marksMap[id] = value;
  }

  uploadMarks(): void {
    const marks = Object.entries(this.marksMap).map(([_id, value]) => ({ _id, value }));
    this.facultyService
      .uploadMarks({ marks, department: this.department, section: this.value.section, year: this.value.year, test: this.value.test })
      .subscribe({
        next: () => {
          alert('Marks uploaded successfully');
          this.value = { year: '', section: '', test: '' };
          this.students = [];
          this.marksMap = {};
          this.search = false;
        },
        error: (err) => {
          this.error = err.error?.examError || err.error?.backendError || 'Something went wrong';
        },
      });
  }
}
