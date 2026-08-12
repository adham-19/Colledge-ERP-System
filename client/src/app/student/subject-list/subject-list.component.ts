import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { AuthService } from '../../core/services/auth.service';
import { EntityColumn } from '../../admin/shared-ui/entity-table/entity-table.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  department = this.authService.currentUser?.result?.['department'] ?? '';
  year = this.authService.currentUser?.result?.['year'] ?? '';

  results: any[] = [];
  loading = true;
  error = '';

  columns: EntityColumn[] = [
    { key: 'subjectName', label: 'Subject Name' },
    { key: 'subjectCode', label: 'Code' },
    { key: 'totalLectures', label: 'Total Lectures' },
  ];

  constructor(private adminService: AdminService, private authService: AuthService) {}

  ngOnInit(): void {
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
}
