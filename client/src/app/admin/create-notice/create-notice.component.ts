import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Notice } from '../../core/models/admin.model';

@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css'],
})
export class CreateNoticeComponent implements OnInit {
  loading = false;
  error = '';

  value: Notice = { date: '', noticeFor: '', topic: '', content: '', from: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  submit(): void {
    this.loading = true;
    this.error = '';
    this.adminService.createNotice(this.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Notice Created Successfully');
        this.clear();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.noticeError || err.error?.backendError || 'Something went wrong';
      },
    });
  }

  clear(): void {
    this.value = { date: '', noticeFor: '', topic: '', content: '', from: '' };
    this.error = '';
  }
}
