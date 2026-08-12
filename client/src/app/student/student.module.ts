import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';

import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { StudentDashboardComponent } from './dashboard/dashboard.component';
import { StudentProfileComponent } from './profile/profile.component';
import { StudentProfileUpdateComponent } from './profile-update/profile-update.component';
import { StudentUpdatePasswordComponent } from './update-password/update-password.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { TestResultComponent } from './test-result/test-result.component';
import { AttendanceComponent } from './attendance/attendance.component';

@NgModule({
  declarations: [
    StudentLayoutComponent,
    StudentHeaderComponent,
    StudentSidebarComponent,
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentProfileUpdateComponent,
    StudentUpdatePasswordComponent,
    SubjectListComponent,
    TestResultComponent,
    AttendanceComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, AdminModule],
})
export class StudentModule {}
