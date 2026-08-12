import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  AuthResponse,
  LoginCredentials,
  LoginErrors,
  StoredUser,
  UserRole,
} from "../models/auth.model";
import { SocketService } from "./socket.service";

const STORAGE_KEY = "user";

@Injectable({ providedIn: "root" })
export class AuthService {
  // بديل الـ store.errors في redux (errorReducer) عشان نعرضه في صفحات اللوجين
  private errorsSubject = new BehaviorSubject<LoginErrors | null>(null);
  errors$: Observable<LoginErrors | null> = this.errorsSubject.asObservable();

  // بديل useSelector((state) => state.admin/faculty/student) - المستخدم الحالي
  private currentUserSubject = new BehaviorSubject<StoredUser | null>(
    this.readUserFromStorage(),
  );
  currentUser$: Observable<StoredUser | null> =
    this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
  ) {}

  private readUserFromStorage(): StoredUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  }

  get currentUser(): StoredUser | null {
    return this.currentUserSubject.value;
  }

  clearErrors(): void {
    this.errorsSubject.next(null);
  }

  // === نفس adminSignIn / facultySignIn / studentSignIn في adminActions.js ===
  adminSignIn(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.signIn("admin", credentials);
  }

  facultySignIn(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.signIn("faculty", credentials);
  }

  studentSignIn(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.signIn("student", credentials);
  }

updateCurrentUser(updatedUser: any): void {
  const current = this.currentUser;

  if (!current) return;

  const updated: StoredUser = {
    ...current,
    result: updatedUser,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  this.currentUserSubject.next(updated);
}

  private signIn(
    role: UserRole,
    credentials: LoginCredentials,
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/${role}/login`, credentials)
      .pipe(
        tap((res) => this.persistSession(role, res)),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private persistSession(role: UserRole, res: AuthResponse): void {
    const stored: StoredUser = { ...res, role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    this.currentUserSubject.next(stored);
    this.errorsSubject.next(null);
  }

  private handleError(err: HttpErrorResponse) {
    // نفس شكل الأخطاء الراجعة من adminController (usernameError / passwordError)
    const payload: LoginErrors = err.error ?? {
      passwordError: "Something went wrong",
    };
    this.errorsSubject.next(payload);
    return throwError(() => err);
  }

  logout(): void {
    this.socketService.disconnect();
    localStorage.removeItem(STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  get token(): string | null {
    return this.currentUser?.token ?? null;
  }

  get role(): UserRole | null {
    return this.currentUser?.role ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
