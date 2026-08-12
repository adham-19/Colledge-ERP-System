import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class StudentProfileComponent {
  user = this.authService.currentUser?.result;

  constructor(private authService: AuthService) {}
}
