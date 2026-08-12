import { Component } from '@angular/core';

interface SidebarLink {
  label: string;
  path: string;
  icon: string;
}

interface SidebarSection {
  links: SidebarLink[];
}

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css'],
})
export class StudentSidebarComponent {
  sections: SidebarSection[] = [
    {
      links: [
        { label: 'Dashboard', path: '/student/home', icon: 'bi-house' },
        { label: 'Profile', path: '/student/profile', icon: 'bi-person-badge' },
      ],
    },
    {
      links: [
        { label: 'Test Results', path: '/student/testresult', icon: 'bi-clipboard-check' },
        { label: 'Attendance', path: '/student/attendance', icon: 'bi-calendar-check' },
      ],
    },
    {
      links: [{ label: 'Subject List', path: '/student/subjectlist', icon: 'bi-journal-bookmark' }],
    },
  ];
}
