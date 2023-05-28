import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

interface MenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidenavOpen = false;

  constructor(private authService: AuthService) { }

  get isLoggedIn() {
    if (this.authService.getToken()) {
      return true
    }
    return false
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen
  }
}
