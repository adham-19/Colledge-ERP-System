import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { DeleteFacultyComponent } from './delete-faculty/delete-faculty.component';
import { OurFacultyComponent } from './our-faculty/our-faculty.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { OurStudentComponent } from './our-student/our-student.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { DeleteSubjectComponent } from './delete-subject/delete-subject.component';
import { OurSubjectComponent } from './our-subject/our-subject.component';
import { EntityTableComponent } from './shared-ui/entity-table/entity-table.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    UpdatePasswordComponent,
    CreateNoticeComponent,
    AddAdminComponent,
    DeleteAdminComponent,
    AddDepartmentComponent,
    DeleteDepartmentComponent,
    AddFacultyComponent,
    DeleteFacultyComponent,
    OurFacultyComponent,
    AddStudentComponent,
    DeleteStudentComponent,
    OurStudentComponent,
    AddSubjectComponent,
    DeleteSubjectComponent,
    OurSubjectComponent,
    EntityTableComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [EntityTableComponent],
})
export class AdminModule {}
