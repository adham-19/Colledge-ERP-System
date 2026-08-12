import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  AdminProfileUpdate,
  UpdatePasswordPayload,
} from "../models/admin.model";

const BASE = `${environment.apiUrl}/faculty`;

export interface CreateTestPayload {
  test: string;
  subjectCode: string;
  department: string;
  year: string;
  section: string;
  totalMarks: string;
  date: string;
}

export interface StudentSearchPayload {
  department: string;
  year: string;
  section: string;
}

export interface MarkEntry {
  _id: string;
  value: string;
}

export interface UploadMarksPayload {
  marks: MarkEntry[];
  department: string;
  section: string;
  year: string;
  test: string;
}

export interface MarkAttendancePayload {
  selectedStudents: string[];
  subjectName: string;
  department: string;
  year: string;
  section: string;
}

@Injectable({ providedIn: "root" })
export class FacultyService {
  constructor(private http: HttpClient) {}

  updateProfile(
    payload: AdminProfileUpdate & { designation?: string },
  ): Observable<any> {
    return this.http.post(`${BASE}/updateprofile`, payload);
  }

  updatePassword(payload: UpdatePasswordPayload): Observable<any> {
    return this.http.post(`${BASE}/updatepassword`, payload);
  }

  createTest(payload: CreateTestPayload): Observable<any> {
    return this.http.post(`${BASE}/createtest`, payload);
  }

  getSubjects(payload: { department: string }): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/getsubjects`, payload);
  }

  getTest(payload: {
    department: string;
    year: string;
    section: string;
  }): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/gettest`, payload);
  }

  getStudent(payload: StudentSearchPayload): Observable<{ result: any[] }> {
    return this.http.post<{ result: any[] }>(`${BASE}/getstudent`, payload);
  }

  uploadMarks(payload: UploadMarksPayload): Observable<any> {
    return this.http.post(`${BASE}/uploadmarks`, payload);
  }

  markAttendance(payload: MarkAttendancePayload): Observable<any> {
    return this.http.post(`${BASE}/markattendance`, payload);
  }
}
