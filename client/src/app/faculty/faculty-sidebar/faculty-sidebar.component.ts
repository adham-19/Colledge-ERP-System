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
  selector: 'app-faculty-sidebar',
  templateUrl: './faculty-sidebar.component.html',
  styleUrls: ['./faculty-sidebar.component.css'],
})
export class FacultySidebarComponent {
  sections: SidebarSection[] = [
    {
      links: [
        { label: 'Dashboard', path: '/faculty/home', icon: 'bi-house' },
        { label: 'Profile', path: '/faculty/profile', icon: 'bi-person-badge' },
      ],
    },
    {
      links: [
        { label: 'Create Test', path: '/faculty/createtest', icon: 'bi-plus-circle' },
        { label: 'Upload Marks', path: '/faculty/uploadmarks', icon: 'bi-clipboard-check' },
      ],
    },
    {
      links: [{ label: 'Mark Attendance', path: '/faculty/markattendance', icon: 'bi-calendar-check' }],
    },
  ];
}
