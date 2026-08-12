// نفس شكل الـ response اللي راجع من السيرفر (adminController/facultyController/studentController -> login)
// { result: { ...user fields, passwordUpdated }, token: string }

export type UserRole = 'admin' | 'faculty' | 'student';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResult {
  _id?: string;
  email?: string;
  username?: string;
  passwordUpdated?: boolean;
  [key: string]: any; // باقي حقول الـ Admin/Faculty/Student model
}

export interface AuthResponse {
  result: LoginResult;
  token: string;
}

// الشكل اللي بيتخزن في localStorage تحت مفتاح "user"، وبنضيفله الـ role
export interface StoredUser extends AuthResponse {
  role: UserRole;
}

// شكل الأخطاء الراجعة من السيرفر عند فشل اللوجين
// { usernameError?: string, passwordError?: string }
export interface LoginErrors {
  usernameError?: string;
  passwordError?: string;
  [key: string]: any;
}
