import { Component } from '@angular/core';

interface SidebarLink {
  label: string;
  path?: string; // لو undefined يبقى لسه هيتضاف في الخطوة الجاية
  icon: string;
}

interface SidebarSection {
  links: SidebarLink[];
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent {

  sections: SidebarSection[] = [
    {
      links: [
        { label: 'Dashboard', path: '/admin/home', icon: 'bi-house' },
        { label: 'Profile', path: '/admin/profile', icon: 'bi-person-badge' },
      ],
    },
    {
      links: [{ label: 'Create Notice', path: '/admin/createnotice', icon: 'bi-plus-circle' }],
    },
    {
      links: [
        { label: 'Add Admin', path: '/admin/addadmin', icon: 'bi-plus-circle' },
        { label: 'Delete Admin', path: '/admin/deleteadmin', icon: 'bi-trash' },
      ],
    },
    {
      links: [
        { label: 'Add Department', path: '/admin/adddepartment', icon: 'bi-plus-circle' },
        { label: 'Delete Department', path: '/admin/deletedepartment', icon: 'bi-trash' },
      ],
    },
    {
      links: [
        { label: 'Our Faculty', path: '/admin/allfaculty', icon: 'bi-person-workspace' },
        { label: 'Add Faculty', path: '/admin/addfaculty', icon: 'bi-plus-circle' },
        { label: 'Delete Faculty', path: '/admin/deletefaculty', icon: 'bi-trash' },
      ],
    },
    {
      links: [
        { label: 'Our Students', path: '/admin/allstudent', icon: 'bi-mortarboard' },
        { label: 'Add Students', path: '/admin/addstudent', icon: 'bi-plus-circle' },
        { label: 'Delete Student', path: '/admin/deletestudent', icon: 'bi-trash' },
      ],
    },
    {
      links: [
        { label: 'Subjects', path: '/admin/allsubject', icon: 'bi-journal-bookmark' },
        { label: 'Add Subject', path: '/admin/addsubject', icon: 'bi-plus-circle' },
        { label: 'Delete Subject', path: '/admin/deletesubject', icon: 'bi-trash' },
      ],
    },
  ];
}
