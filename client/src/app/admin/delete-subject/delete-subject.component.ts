import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Department } from '../../core/models/admin.model';
import { EntityColumn } from '../shared-ui/entity-table/entity-table.component';

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: ['./delete-subject.component.css'],
})
export class DeleteSubjectComponent implements OnInit {
  departments: Department[] = [];
  department = '';
  year = '';
  results: any[] = [];
  searched = false;
  loading = false;
  error = '';

  columns: EntityColumn[] = [
    { key: 'subjectName', label: 'Subject Name' },
    { key: 'subjectCode', label: 'Code' },
    { key: 'totalLectures', label: 'Total Lectures' },
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllDepartment().subscribe((depts) => (this.departments = depts));
  }

  search(): void {
    this.loading = true;
    this.error = '';
    this.searched = true;
    this.adminService.getSubject({ department: this.department, year: this.year }).subscribe({
      next: (res) => {
        this.results = res.result;
        this.loading = false;
      },
      error: (err) => {
        this.results = [];
        this.loading = false;
        this.error = err.error?.noSubjectError || err.error?.backendError || 'Something went wrong';
      },
    });
  }

  onDelete(ids: string[]): void {
    if (ids.length === 0) return;
    this.loading = true;
    this.adminService.deleteSubject(ids).subscribe({
      next: () => {
        alert('Subject Deleted');
        this.search();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.backendError || 'Something went wrong';
      },
    });
  }
}
