import {
  Component,
  OnInit
} from '@angular/core';

import {
  NgIf,
  NgFor,
  NgClass,
  DatePipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { Charts } from '../charts/charts';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Sidebar,
    Navbar,
    Charts,
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    MatSnackBarModule,
    DatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // Layout
  sidebarOpen = window.innerWidth > 768;

  // Auth
  currentUser: any;
  isAdmin = false;

  // Data
  users: any[] = [];
  filteredUsers: any[] = [];
  loading = true;

  // Search
  searchText = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 8;

  // Edit state
  editingUserId: number | null = null;

  // Form model
  newUser = {
    username: '',
    password: '',
    role: 'General User'
  };

  // Date
  today = new Date();

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Restore dark mode
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Get current user
    this.currentUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.isAdmin = this.currentUser?.role === 'Admin';

    this.fetchUsers();
  }

  // Toggle sidebar
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Fetch users
  fetchUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        this.filteredUsers = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.toast('Failed to fetch users', 'error');
      }
    });
  }

  // Add user
  addUser() {
    if (!this.newUser.username || !this.newUser.password) {
      this.toast('Please fill all fields', 'warn');
      return;
    }

    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.toast('User added successfully', 'success');
        this.fetchUsers();
        this.resetForm();
      },
      error: (err) => {
        this.toast(err?.error?.message || 'Failed to add user', 'error');
      }
    });
  }

  // Edit user
  editUser(user: any) {
    this.editingUserId = user.id;
    this.newUser = {
      username: user.username,
      password: user.password,
      role: user.role
    };
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update user
  updateUser() {
    this.userService.updateUser(this.editingUserId!, this.newUser).subscribe({
      next: () => {
        this.toast('User updated successfully', 'success');
        this.fetchUsers();
        this.editingUserId = null;
        this.resetForm();
      },
      error: (err) => {
        this.toast(err?.error?.message || 'Failed to update user', 'error');
      }
    });
  }

  // Delete user
  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.toast('User deleted', 'success');
        this.fetchUsers();
      },
      error: () => {
        this.toast('Failed to delete user', 'error');
      }
    });
  }

  // Filter users
  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }

  // Paginated users
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  // Total pages
  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // Reset form
  resetForm() {
    this.newUser = { username: '', password: '', role: 'General User' };
    this.editingUserId = null;
  }

  // Toast helper
  private toast(message: string, type: 'success' | 'error' | 'warn') {
    const icons: Record<string, string> = {
      success: '✅',
      error: '❌',
      warn: '⚠️'
    };
    this.snackBar.open(`${icons[type]} ${message}`, 'Dismiss', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: [`snack-${type}`]
    });
  }
}
