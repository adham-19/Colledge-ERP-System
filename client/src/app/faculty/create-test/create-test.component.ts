import { Component } from '@angular/core';
import { FacultyService, CreateTestPayload } from '../../core/services/faculty.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent {
  loading = false;
  error = '';
  department = this.authService.currentUser?.result?.['department'] ?? '';

  value: CreateTestPayload = {
    test: '',
    subjectCode: '',
    department: this.department,
    year: '',
    section: '',
    totalMarks: '',
    date: '',
  };

  constructor(private facultyService: FacultyService, private authService: AuthService) {}

  submit(): void {
    this.loading = true;
    this.error = '';
    this.facultyService.createTest(this.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Test Created Successfully');
        this.clear();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.testError || err.error?.backendError || 'Something went wrong';
      },
    });
  }

  clear(): void {
    this.value = {
      test: '',
      subjectCode: '',
      department: this.department,
      year: '',
      section: '',
      totalMarks: '',
      date: '',
    };
    this.error = '';
  }
}
