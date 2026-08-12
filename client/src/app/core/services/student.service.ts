import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminProfileUpdate, UpdatePasswordPayload } from '../models/admin.model';

const BASE = `${environment.apiUrl}/student`;

export interface StudentSearchPayload {
  department: string;
  year: string;
  section: string;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) {}

  updateProfile(payload: AdminProfileUpdate & Record<string, any>): Observable<any> {
    return this.http.post(`${BASE}/updateprofile`, payload);
  }

  updatePassword(payload: UpdatePasswordPayload): Observable<any> {
    return this.http.post(`${BASE}/updatepassword`, payload);
  }

  getTestResult(payload: StudentSearchPayload): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/testresult`, payload);
  }

  getAttendance(payload: StudentSearchPayload): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/attendance`, payload);
  }
}
