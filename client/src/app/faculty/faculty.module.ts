import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FacultyLayoutComponent } from './faculty-layout/faculty-layout.component';
import { FacultyHeaderComponent } from './faculty-header/faculty-header.component';
import { FacultySidebarComponent } from './faculty-sidebar/faculty-sidebar.component';
import { FacultyDashboardComponent } from './dashboard/dashboard.component';
import { FacultyProfileComponent } from './profile/profile.component';
import { FacultyProfileUpdateComponent } from './profile-update/profile-update.component';
import { FacultyUpdatePasswordComponent } from './update-password/update-password.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { UploadMarksComponent } from './upload-marks/upload-marks.component';

@NgModule({
  declarations: [
    FacultyLayoutComponent,
    FacultyHeaderComponent,
    FacultySidebarComponent,
    FacultyDashboardComponent,
    FacultyProfileComponent,
    FacultyProfileUpdateComponent,
    FacultyUpdatePasswordComponent,
    CreateTestComponent,
    MarkAttendanceComponent,
    UploadMarksComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class FacultyModule {}
