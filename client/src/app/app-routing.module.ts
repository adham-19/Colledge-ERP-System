import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login/login.component";
import { AdminLoginComponent } from "./login/admin-login/admin-login.component";
import { FacultyLoginComponent } from "./login/faculty-login/faculty-login.component";
import { StudentLoginComponent } from "./login/student-login/student-login.component";

import { AdminLayoutComponent } from "./admin/admin-layout/admin-layout.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { ProfileComponent } from "./admin/profile/profile.component";
import { ProfileUpdateComponent } from "./admin/profile-update/profile-update.component";
import { UpdatePasswordComponent } from "./admin/update-password/update-password.component";
import { CreateNoticeComponent } from "./admin/create-notice/create-notice.component";
import { AddAdminComponent } from "./admin/add-admin/add-admin.component";
import { DeleteAdminComponent } from "./admin/delete-admin/delete-admin.component";
import { AddDepartmentComponent } from "./admin/add-department/add-department.component";
import { DeleteDepartmentComponent } from "./admin/delete-department/delete-department.component";
import { AddFacultyComponent } from "./admin/add-faculty/add-faculty.component";
import { DeleteFacultyComponent } from "./admin/delete-faculty/delete-faculty.component";
import { OurFacultyComponent } from "./admin/our-faculty/our-faculty.component";
import { AddStudentComponent } from "./admin/add-student/add-student.component";
import { DeleteStudentComponent } from "./admin/delete-student/delete-student.component";
import { OurStudentComponent } from "./admin/our-student/our-student.component";
import { AddSubjectComponent } from "./admin/add-subject/add-subject.component";
import { DeleteSubjectComponent } from "./admin/delete-subject/delete-subject.component";
import { OurSubjectComponent } from "./admin/our-subject/our-subject.component";

import { FacultyLayoutComponent } from "./faculty/faculty-layout/faculty-layout.component";
import { FacultyDashboardComponent } from "./faculty/dashboard/dashboard.component";
import { FacultyProfileComponent } from "./faculty/profile/profile.component";
import { FacultyProfileUpdateComponent } from "./faculty/profile-update/profile-update.component";
import { FacultyUpdatePasswordComponent } from "./faculty/update-password/update-password.component";
import { CreateTestComponent } from "./faculty/create-test/create-test.component";
import { MarkAttendanceComponent } from "./faculty/mark-attendance/mark-attendance.component";
import { UploadMarksComponent } from "./faculty/upload-marks/upload-marks.component";

import { StudentLayoutComponent } from "./student/student-layout/student-layout.component";
import { StudentDashboardComponent } from "./student/dashboard/dashboard.component";
import { StudentProfileComponent } from "./student/profile/profile.component";
import { StudentProfileUpdateComponent } from "./student/profile-update/profile-update.component";
import { StudentUpdatePasswordComponent } from "./student/update-password/update-password.component";
import { SubjectListComponent } from "./student/subject-list/subject-list.component";
import { TestResultComponent } from "./student/test-result/test-result.component";
import { AttendanceComponent } from "./student/attendance/attendance.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./login/reset-password/reset-password.component";

// ملحوظة: باقي موديولات Faculty وStudent هتتضاف تباعًا بنفس الأسلوب
const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },

  // Login
  { path: "login/adminlogin", component: AdminLoginComponent },
  { path: "login/facultylogin", component: FacultyLoginComponent },
  { path: "login/studentlogin", component: StudentLoginComponent },
  { path: "forgot-password/:role", component: ForgotPasswordComponent },
  { path: "reset-password/:token/:role", component: ResetPasswordComponent },

  // Admin - نفس تقسيم الروابط الموجود في App.js الأصلي، كلها تحت AdminLayout (Header+Sidebar)
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "home", component: DashboardComponent },
      { path: "profile", component: ProfileComponent },
      { path: "update", component: ProfileUpdateComponent },
      { path: "update/password", component: UpdatePasswordComponent },
      // أول ما يسجل الأدمن دخول لأول مرة، بيتوجه هنا (data.firstTime = true بيغير شكل الصفحة شوية)
      {
        path: "updatepassword",
        component: UpdatePasswordComponent,
        data: { firstTime: true },
      },
      { path: "createnotice", component: CreateNoticeComponent },
      { path: "addadmin", component: AddAdminComponent },
      { path: "deleteadmin", component: DeleteAdminComponent },
      { path: "adddepartment", component: AddDepartmentComponent },
      { path: "deletedepartment", component: DeleteDepartmentComponent },
      { path: "allfaculty", component: OurFacultyComponent },
      { path: "addfaculty", component: AddFacultyComponent },
      { path: "deletefaculty", component: DeleteFacultyComponent },
      { path: "allstudent", component: OurStudentComponent },
      { path: "addstudent", component: AddStudentComponent },
      { path: "deletestudent", component: DeleteStudentComponent },
      { path: "allsubject", component: OurSubjectComponent },
      { path: "addsubject", component: AddSubjectComponent },
      { path: "deletesubject", component: DeleteSubjectComponent },
    ],
  },

  // Faculty - نفس تقسيم الروابط الموجود في App.js الأصلي
  {
    path: "faculty",
    component: FacultyLayoutComponent,
    children: [
      { path: "home", component: FacultyDashboardComponent },
      { path: "profile", component: FacultyProfileComponent },
      { path: "update", component: FacultyProfileUpdateComponent },
      { path: "update/password", component: FacultyUpdatePasswordComponent },
      {
        path: "password",
        component: FacultyUpdatePasswordComponent,
        data: { firstTime: true },
      },
      { path: "createtest", component: CreateTestComponent },
      { path: "markattendance", component: MarkAttendanceComponent },
      { path: "uploadmarks", component: UploadMarksComponent },
    ],
  },

  // Student - نفس تقسيم الروابط الموجود في App.js الأصلي
  {
    path: "student",
    component: StudentLayoutComponent,
    children: [
      { path: "home", component: StudentDashboardComponent },
      { path: "profile", component: StudentProfileComponent },
      { path: "update", component: StudentProfileUpdateComponent },
      { path: "update/password", component: StudentUpdatePasswordComponent },
      {
        path: "password",
        component: StudentUpdatePasswordComponent,
        data: { firstTime: true },
      },
      { path: "subjectlist", component: SubjectListComponent },
      { path: "testresult", component: TestResultComponent },
      { path: "attendance", component: AttendanceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
