import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, of } from 'rxjs';
import { Department, Notice, AdminProfileUpdate, UpdatePasswordPayload } from '../models/admin.model';

const BASE = `${environment.apiUrl}/admin`;

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  // === Dashboard data (نفس getAllStudent/getAllFaculty/getAllAdmin/getAllDepartment/getNotice) ===
  getAllStudent(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/getallstudent`);
  }

  getAllFaculty(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/getallfaculty`);
  }

  getAllAdmin(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/getalladmin`);
  }

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${BASE}/getalldepartment`);
  }

  getAllSubject(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE}/getallsubject`);
  }

   /* getNotice(): Observable<{ result: Notice[] }> {
    return this.http.post<{ result: Notice[] }>(`${BASE}/getnotice`, {});
  } */ 

  getNotice(){
  return this.http.get<{result: Notice[]}>(`${BASE}/getnotice`, {})
  .pipe(
    catchError(() => of({result: []}))
  );
}

  createNotice(notice: Notice): Observable<any> {
    return this.http.post(`${BASE}/createnotice`, notice);
  }

  // === Profile ===
  updateProfile(payload: AdminProfileUpdate): Observable<any> {
    return this.http.post(`${BASE}/updateprofile`, payload);
  }

  updatePassword(payload: UpdatePasswordPayload): Observable<any> {
    return this.http.post(`${BASE}/updatepassword`, payload);
  }

  // === Admin CRUD ===
  addAdmin(payload: any): Observable<any> {
    return this.http.post(`${BASE}/addadmin`, payload);
  }

  getAdmin(payload: { department: string }): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/getadmin`, payload);
  }

  deleteAdmin(ids: string[]): Observable<any> {
    return this.http.post(`${BASE}/deleteadmin`, ids);
  }

  // === Department CRUD ===
  addDepartment(payload: { department: string }): Observable<any> {
    return this.http.post(`${BASE}/adddepartment`, payload);
  }

  deleteDepartment(payload: { department: string }): Observable<any> {
    return this.http.post(`${BASE}/deletedepartment`, payload);
  }

  // === Faculty CRUD ===
  addFaculty(payload: any): Observable<any> {
    return this.http.post(`${BASE}/addfaculty`, payload);
  }

  getFaculty(payload: { department: string }): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/getfaculty`, payload);
  }

  deleteFaculty(ids: string[]): Observable<any> {
    return this.http.post(`${BASE}/deletefaculty`, ids);
  }

  // === Student CRUD ===
  addStudent(payload: any): Observable<any> {
    return this.http.post(`${BASE}/addstudent`, payload);
  }

  getStudent(payload: { department: string; year: string }): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/getstudent`, payload);
  }

  deleteStudent(ids: string[]): Observable<any> {
    return this.http.post(`${BASE}/deletestudent`, ids);
  }

  // === Subject CRUD ===
  addSubject(payload: any): Observable<any> {
    return this.http.post(`${BASE}/addsubject`, payload);
  }

  getSubject(payload: { department: string; year: string }): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/getsubject`, payload);
  }

  deleteSubject(ids: string[]): Observable<any> {
    return this.http.post(`${BASE}/deletesubject`, ids);
  }
}

