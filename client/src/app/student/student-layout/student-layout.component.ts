import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css'],
})
export class StudentLayoutComponent implements OnInit, OnDestroy {

  private newTestSub?: Subscription;

  showTestNotification = false;
  newTest: any = null;

  constructor(
    private socketService: SocketService
  ) {}

  ngOnInit(): void {

    this.newTestSub = this.socketService.newTest$.subscribe((test) => {

      console.log('New test received:', test);

      this.newTest = test;
      this.showTestNotification = true;

      // Automatically hide after 5 seconds
      setTimeout(() => {
        this.showTestNotification = false;
      }, 5000);

    });

  }

  closeTestNotification(): void {
    this.showTestNotification = false;
  }

  ngOnDestroy(): void {
    this.newTestSub?.unsubscribe();
  }
}