# College ERP — نسخة Angular (تحت التحويل التدريجي)

هذا تحويل موديولي **Login** و **Admin** بالكامل من React (المشروع الأصلي College-Erp) إلى Angular.
باقي الموديولات (Faculty, Student) هتتضاف تباعًا بنفس الأسلوب.

## القرارات المعمارية

| في React | البديل في Angular |
|---|---|
| Redux (actions/reducers) | `AuthService` / `AdminService` + RxJS |
| axios + interceptor | `HttpClient` + `authInterceptor` (functional interceptor) |
| react-router-dom | `@angular/router` (نفس أسماء المسارات بالظبط) |
| Tailwind CSS | Bootstrap 5 + تصميم "Campus Admit Card" مخصص |
| useState / useEffect | خصائص الكلاس + `ngOnInit`/`ngOnDestroy` |
| Header/Sidebar مكررين في كل صفحة | `AdminLayoutComponent` واحد بـ `<router-outlet>` |
| مكون جدول الحذف (deleteAdmin/Faculty/Student/Subject) مكرر | `EntityTableComponent` مشترك واحد |

## هيكل المشروع

```
src/app/
  core/
    services/
      auth.service.ts     -> بديل adminActions/facultyActions/studentActions (اللوجين) + api/index.js
      admin.service.ts     -> بديل كل استدعاءات adminActions.js (CRUD كامل)
    interceptors/auth.interceptor.ts
    models/auth.model.ts, admin.model.ts
    utils/file-to-base64.ts -> بديل react-file-base64

  login/
    login/, admin-login/, faculty-login/, student-login/

  admin/
    admin-layout/, admin-header/, admin-sidebar/   -> الهيكل العام (بديل Header.js/Sidebar.js)
    dashboard/                                      -> بديل admin/Body.js (إحصائيات + تقويم + إشعارات)
    profile/, profile-update/, update-password/     -> بديل profile/Body.js وupdate/*
    create-notice/                                   -> بديل createNotice/Body.js
    add-admin/, delete-admin/
    add-department/, delete-department/
    add-faculty/, delete-faculty/, our-faculty/
    add-student/, delete-student/, our-student/
    add-subject/, delete-subject/, our-subject/
    shared/admin.css                                 -> ستايلات مشتركة (ledger/forms)
    shared-ui/entity-table/                          -> جدول عرض/حذف قابل لإعادة الاستخدام

  app-routing.module.ts    -> فيه اللوجين + كل مسارات /admin/*
  app.module.ts
```

## المسارات (Routes) المتاحة حاليًا

**Login:** `/`, `/login/adminlogin`, `/login/facultylogin`, `/login/studentlogin`

**Admin** (كلها تحت `AdminLayoutComponent`):
`/admin/home`, `/admin/profile`, `/admin/update`, `/admin/update/password`,
`/admin/createnotice`, `/admin/addadmin`, `/admin/deleteadmin`,
`/admin/adddepartment`, `/admin/deletedepartment`,
`/admin/allfaculty`, `/admin/addfaculty`, `/admin/deletefaculty`,
`/admin/allstudent`, `/admin/addstudent`, `/admin/deletestudent`,
`/admin/allsubject`, `/admin/addsubject`, `/admin/deletesubject`

نفس المسارات بالظبط الموجودة في `App.js` الأصلي.

## ملاحظة مهمة عن الـ API

في `src/environments/environment.ts` الـ `apiUrl` متظبط على:
```
http://localhost:5001/api
```
وده نفس الـ `baseURL` الموجود في `client/src/redux/api/index.js` الأصلي — يعني السيرفر (`server/`) بتاع المشروع الأصلي شغال زي ما هو من غير أي تعديل.

## طريقة التشغيل (على جهازك، بعد التحميل)

```bash
cd angular-client
npm install
npx ng serve -o
```

هيفتح على `http://localhost:4200`.

**تأكد الأول إن السيرفر (backend) شغال على البورت 5001** بنفس خطوات المشروع الأصلي (`cd server && npm install && npm start`).

> ملحوظة: لو ظهر أي خطأ بخصوص Angular CLI عالمي متعارض، استخدم `npx ng serve -o` بدل `ng serve -o` مباشرة.

## الخطوة الجاية

هنكمل بنفس الأسلوب:
1. موديول Faculty (createTest, uploadMarks, markAttendance، إلخ)
2. موديول Student (subjectList, testResult, attendance، إلخ)

