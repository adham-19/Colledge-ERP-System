import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppNotification {
  id: number;
  type: "success" | "error" | "info" | "warning" | "test";
  title: string;
  message?: string;

  // Used only for test notifications
  subjectCode?: string;
  testName?: string;
  date?: string;
  totalMarks?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);

  notifications$ = this.notificationsSubject.asObservable();

  private nextId = 1;

  private addNotification(notification: Omit<AppNotification, "id">) {
    const newNotification: AppNotification = {
      ...notification,
      id: this.nextId++,
    };

    const current = this.notificationsSubject.value;

    this.notificationsSubject.next([
      ...current,
      newNotification,
    ]);

    return newNotification.id;
  }

  success(title: string, message?: string) {
    return this.addNotification({
      type: "success",
      title,
      message,
    });
  }

  error(title: string, message?: string) {
    return this.addNotification({
      type: "error",
      title,
      message,
    });
  }

  info(title: string, message?: string) {
    return this.addNotification({
      type: "info",
      title,
      message,
    });
  }

  warning(title: string, message?: string) {
    return this.addNotification({
      type: "warning",
      title,
      message,
    });
  }

  test(data: {
    subjectCode: string;
    testName: string;
    date: string;
    totalMarks: number;
  }) {
    return this.addNotification({
      type: "test",
      title: "New Test Available",
      subjectCode: data.subjectCode,
      testName: data.testName,
      date: data.date,
      totalMarks: data.totalMarks,
    });
  }

  removeNotification(id: number) {
    const current = this.notificationsSubject.value;

    this.notificationsSubject.next(
      current.filter((notification) => notification.id !== id)
    );
  }

  clearAll() {
    this.notificationsSubject.next([]);
  }
}
