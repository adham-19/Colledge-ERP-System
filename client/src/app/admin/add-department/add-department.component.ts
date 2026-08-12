import { Component } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent {
  department = '';
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  submit(): void {
    this.loading = true;
    this.error = '';
    this.adminService.addDepartment({ department: this.department }).subscribe({
      next: () => {
        this.loading = false;
        alert('Department Added Successfully');
        this.department = '';
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.departmentError || err.error?.backendError || 'Something went wrong';
      },
    });
  }
}
