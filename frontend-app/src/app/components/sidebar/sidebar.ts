import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';

import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit, OnDestroy {

  @Input()  sidebarOpen = true;
  @Input()  userCount = 0;
  @Output() closeSidebar = new EventEmitter<void>();

  userName    = 'User';
  userRole    = 'General User';
  userInitial = 'U';
  isMobile    = false;

  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    // Load user info
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.username) {
      this.userName    = user.username;
      this.userInitial = user.username.charAt(0).toUpperCase();
    }
    if (user?.role) {
      this.userRole = user.role;
    }

    // Set initial mobile state
    this.checkMobile();

    // Watch viewport changes (resize, orientation flip)
    this.resizeObserver = new ResizeObserver(() => this.checkMobile());
    this.resizeObserver.observe(document.body);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  // Called ONLY by the overlay click — never by nav items
  onOverlayClick(): void {
    this.closeSidebar.emit();
  }

  // Close on Escape key for accessibility
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobile && this.sidebarOpen) {
      this.closeSidebar.emit();
    }
  }
}
