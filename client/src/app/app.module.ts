import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
  declarations: [AppComponent, NotificationComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule, AdminModule, FacultyModule, StudentModule],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
