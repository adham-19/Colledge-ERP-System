import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Department } from '../../core/models/admin.model';
import { EntityColumn } from '../shared-ui/entity-table/entity-table.component';

@Component({
  selector: 'app-our-student',
  templateUrl: './our-student.component.html',
  styleUrls: ['./our-student.component.css'],
})
export class OurStudentComponent implements OnInit {
  departments: Department[] = [];
  department = '';
  year = '';
  results: any[] = [];
  searched = false;
  loading = false;
  error = '';

  columns: EntityColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'section', label: 'Section' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllDepartment().subscribe((depts) => (this.departments = depts));
  }

  search(): void {
    this.loading = true;
    this.error = '';
    this.searched = true;
    this.adminService.getStudent({ department: this.department, year: this.year }).subscribe({
      next: (res) => {
        this.results = res.result;
        this.loading = false;
      },
      error: (err) => {
        this.results = [];
        this.loading = false;
        this.error = err.error?.noStudentError || err.error?.backendError || 'Something went wrong';
      },
    });
  }
}
