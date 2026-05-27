import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  Input
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  @Output() menuToggle = new EventEmitter<void>();
  @Output() themeChange = new EventEmitter<boolean>();

  isDarkMode = false;
  userName = 'User';
  userInitial = 'U';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.username) {
      this.userName = user.username;
      this.userInitial = user.username.charAt(0).toUpperCase();
    }
  }

  toggleMenu() {
    this.menuToggle.emit();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.themeChange.emit(this.isDarkMode);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
