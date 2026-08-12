import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FacultyLoginComponent } from './faculty-login/faculty-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    AdminLoginComponent,
    FacultyLoginComponent,
    StudentLoginComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class LoginModule {}
