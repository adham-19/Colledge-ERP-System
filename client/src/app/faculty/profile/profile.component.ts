import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class FacultyProfileComponent {
  user = this.authService.currentUser?.result;

  constructor(private authService: AuthService) {}
}
