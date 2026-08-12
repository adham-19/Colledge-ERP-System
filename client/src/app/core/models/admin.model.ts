// نفس شكل بيانات موديلات السيرفر (server/models/*.js)

export interface Department {
  _id?: string;
  department: string;
  [key: string]: any;
}

export interface Notice {
  _id?: string;
  from: string;
  content: string;
  topic: string;
  noticeFor: 'all' | 'faculty' | 'student' | string;
  date: string;
}

export interface AdminProfileUpdate {
  name?: string;
  dob?: string;
  department?: string;
  contactNumber?: string;
  avatar?: string;
}

export interface UpdatePasswordPayload {
  newPassword: string;
  confirmPassword: string;
  email: string;
}

// عناصر بسيطة كافية لعرضها في الداشبورد - مش محتاجين كل حقول الموديول الأصلي هنا
export interface DashboardCounts {
  faculty: number;
  student: number;
  admin: number;
  department: number;
}
