import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket?: Socket;

  private newTestSubject = new Subject<any>();

  newTest$ = this.newTestSubject.asObservable();

  connect(token: string): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io("http://localhost:3000", {
      auth: {
        token,
      },
    });

    this.socket.on("new-test", (data) => {
      this.newTestSubject.next(data);
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  connectFromStorage(): void {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user.token) {
      return;
    }

    if (user.role !== "student") {
      return;
    }

    this.connect(user.token);
  }

  onNewTest(callback: (data: any) => void): void {
    this.socket?.on("new-test", callback);
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = undefined;
  }
}
