import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Department } from '../../core/models/admin.model';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css'],
})
export class DeleteDepartmentComponent implements OnInit {
  departments: Department[] = [];
  department = '';
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.adminService.getAllDepartment().subscribe((depts) => (this.departments = depts));
  }

  submit(): void {
    this.loading = true;
    this.error = '';
    this.adminService.deleteDepartment({ department: this.department }).subscribe({
      next: () => {
        this.loading = false;
        alert('Department Deleted');
        this.department = '';
        this.loadDepartments();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.backendError || 'Something went wrong';
      },
    });
  }
}
