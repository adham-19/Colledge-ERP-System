import { Component } from '@angular/core';
import { SocketService } from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private socketService: SocketService) {
    this.socketService.connectFromStorage();
  }
}
