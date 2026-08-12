import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Department } from '../../core/models/admin.model';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css'],
})
export class AddFacultyComponent implements OnInit {
  departments: Department[] = [];
  loading = false;
  error = '';

  value: any = this.emptyValue();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllDepartment().subscribe((depts) => (this.departments = depts));
  }

  private emptyValue() {
    return {
      name: '',
      dob: '',
      email: '',
      gender: '',
      designation: '',
      department: '',
      contactNumber: '',
      joiningYear: new Date().getFullYear().toString(),
    };
  }

  submit(): void {
    this.loading = true;
    this.error = '';
    this.adminService.addFaculty(this.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Faculty Added Successfully');
        this.clear();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.emailError || err.error?.backendError || 'Something went wrong';
      },
    });
  }

  clear(): void {
    this.value = this.emptyValue();
    this.error = '';
  }
}
