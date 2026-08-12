import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { Department } from '../../core/models/admin.model';
import { fileToBase64 } from '../../core/utils/file-to-base64';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
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
      department: '',
      contactNumber: '',
      avatar: '',
      joiningYear: new Date().getFullYear().toString(),
    };
  }

  async onAvatarChange(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.value.avatar = await fileToBase64(file);
  }

  submit(): void {
    this.loading = true;
    this.error = '';
    this.adminService.addAdmin(this.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Admin Added Successfully');
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
