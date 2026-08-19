import { Component, OnInit } from "@angular/core";
import {
  NotificationService,
  AppNotification,
} from "../../core/services/notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrl: "./notification.component.css",
})
export class NotificationComponent implements OnInit {
  notifications: AppNotification[] = [];

  private timers = new Map<number, any>();

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications;

        notifications.forEach((notification) => {
          this.startAutoDismiss(notification);
        });
      }
    );
  }

  closeNotification(id: number): void {
    this.clearTimer(id);

    this.notificationService.removeNotification(id);
  }

  private startAutoDismiss(notification: AppNotification): void {
    if (this.timers.has(notification.id)) {
      return;
    }

    let duration = 5000;

    if (notification.type === "success") {
      duration = 4000;
    }

    if (notification.type === "error") {
      duration = 6000;
    }

    if (notification.type === "test") {
      duration = 8000;
    }

    const timer = setTimeout(() => {
      this.notificationService.removeNotification(
        notification.id
      );

      this.timers.delete(notification.id);
    }, duration);

    this.timers.set(notification.id, timer);
  }

  private clearTimer(id: number): void {
    const timer = this.timers.get(id);

    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }

  getIcon(type: AppNotification["type"]): string {
    switch (type) {
      case "success":
        return "✓";

      case "error":
        return "!";

      case "warning":
        return "⚠";

      case "info":
        return "ⓘ";

      case "test":
        return "🔔";

      default:
        return "ⓘ";
    }
  }
}