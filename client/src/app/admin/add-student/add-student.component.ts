import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Department } from '../../core/models/admin.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
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
      fatherName: '',
      motherName: '',
      department: '',
      section: '',
      batch: '',
      year: '',
      contactNumber: '',
      fatherContactNumber: '',
      motherContactNumber: '',
    };
  }

  submit(): void {
    this.loading = true;
    this.error = '';
    this.adminService.addStudent(this.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Student Added Successfully');
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
